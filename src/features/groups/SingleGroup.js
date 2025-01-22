import { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetGroupsQuery, useGetMessagesQuery } from "./groupsApiSlice";
import MessagesList from "./MessagesList";
import { Link } from "react-router-dom";

const SingleGroup = ({ groupId }) => {
  const { user_id: studentId } = useAuth();
  const { group } = useGetGroupsQuery(studentId, {
    selectFromResult: ({ data }) => ({
      group: data?.entities[groupId],
    }),
  });
  const {
    data: fetchedMessages = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery({groupId: group.id, groupName: group.group_name});

  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([])
  const webSocketRef = useRef(null);
  const clearSearchTerm = () => setSearchTerm("");

  useEffect(() => {
    if (fetchedMessages && fetchedMessages.length > 0) {
      setMessages(fetchedMessages)
    }
  }, [fetchedMessages])

  useEffect(() => {
    const webSocketUrl = `ws://localhost:8000/ws/chat/${group.group_name}/`;
    const socket = new WebSocket(webSocketUrl);
    webSocketRef.current = socket;

    // WebSocket event listeners
    socket.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.payload) {
        setMessages((prevMessages) => [...prevMessages, data.payload]);
      }
    };

    socket.onclose = (event) => {
      console.error(
        `WebSocket connection closed: code=${event.code}, reason=${event.reason}`
      );
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      socket.close();
    };
  }, [group.group_name]);

  // Send a new message
  const sendMessage = () => {
    if (webSocketRef.current && newMessage.trim()) {
      const payload = {
        message: newMessage,
        student_id: studentId,
        group_id: group.id,
      };
      webSocketRef.current.send(JSON.stringify(payload));
      setNewMessage(""); 
    }
  };


  let content;

  if (group) {
    content = (
      <div className="space-y-6">
        {/* Group Header */}
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h1 className="text-xl font-semibold">{group.name}</h1>
          <h3 className="text-sm text-gray-500">{group.member_count} Members</h3>
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden mt-3">
            <i className="fa-solid fa-magnifying-glass px-3 text-gray-500"></i>
            <input
              type="text"
              id="search"
              placeholder="Search messages"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearchTerm}
                className="px-3 text-gray-500 hover:text-gray-800 focus:outline-none"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
          {group.creator === studentId && (
            <div className="mt-4">
              <Link
                to={"edit"}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </Link>
            </div>
          )}
        </div>

        <MessagesList searchTerm={searchTerm} messages={messages} isLoading={isLoading} isSuccess={isSuccess} isError={isError} error={error} />
        <div className="fixed bottom-0 left-0 right-0 sm:left-64 bg-white shadow-md z-10 p-4 max width">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type message here..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              disabled={!newMessage}
              className={`px-4 py-2 text-white rounded-lg ${
                newMessage
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
          </div>
      </div>
    );
  } else content = <p>Group not found</p>;

  return content;
};

export default SingleGroup;
