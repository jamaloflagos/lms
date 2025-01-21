import { useState, useEffect } from "react";
import { useGetMessagesQuery } from "./groupsApiSlice";
import useAuth from "../../hooks/useAuth";

const MessagesList = ({ searchTerm, groupId, groupName }) => {
  const { user_id: studentId } = useAuth();
  const {
    data: messages = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery({groupId, groupName});

  const [highlightIndex, setHighlightIndex] = useState(0);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      const searchResults = messages.filter((message) =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMessages(searchResults);
      setHighlightIndex(0);
    } else {
      // setFilteredMessages([]);
    }
  }, [searchTerm, messages]);

  const handleHighlightNavigation = (direction) => {
    if (filteredMessages.length > 0) {
      setHighlightIndex((prevIndex) =>
        direction === "up"
          ? (prevIndex - 1 + filteredMessages.length) % filteredMessages.length
          : (prevIndex + 1) % filteredMessages.length
      );
    }
  };

  let content;

  if (isLoading) content = <p>Loading group messages...</p>;
  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    content = (
      <div className="bg-white shadow-md p-4 rounded-lg space-y-4 pb-20">
        {searchTerm && filteredMessages.length === 0 && (
          <div className="bg-red-200 text-red-700 p-2 rounded-md text-center">
            No messages found for "{searchTerm}"
          </div>
        )}
        {filteredMessages.length > 0 && (
          <div className="flex justify-end space-x-2 mb-2">
            <button
              onClick={() => handleHighlightNavigation("up")}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <i className="fa-solid fa-arrow-up"></i>
            </button>
            <button
              onClick={() => handleHighlightNavigation("down")}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        )}
        {messages.length > 0 ? (
          <ul className="space-y-3">
            {messages.map((message, index) => {
              const isHighlighted =
                searchTerm &&
                filteredMessages[highlightIndex]?.content === message.content;

              const messageClass =
                message.sender === studentId
                  ? "bg-blue-200 text-left"
                  : "bg-green-200 text-right";

              return (
                <li
                  key={index}
                  className={`p-3 rounded-md ${messageClass} ${
                    isHighlighted ? "ring-2 ring-yellow-500" : ""
                  }`}
                >
                  <p>{message.content}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">
            No messages, type a message to start a chat.
          </p>
        )}
      </div>
    );
  }

  return content;
};

export default MessagesList;
