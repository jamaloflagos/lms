import React, { useState, useEffect, useRef } from "react";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { useStudent } from "../../hooks/useStudent";
import { useQueryClient } from "@tanstack/react-query";

const GroupChat = ({ groupId, groupName }) => {
  const {
    data: messages,
    messagesIsLoading,
    messagesIsError,
  } = useCustomQuery(
    ["messages", groupId],
    `https://lms-api-xi.vercel.app/groups/${groupId}/messages`
  );
  const { studentDetail } = useStudent();
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const socketRef = useRef(null);

  const wsUrl = `ws://127.0.0.1:8000/ws/chat/${groupName}/`;

  useEffect(() => {
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      queryClient.refetchQueries(["messages"]);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [wsUrl, queryClient]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const messageData = {
      student_id: studentDetail.id,
      message: message,
    };

    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(messageData));
    }

    setMessage("");
  };

  if (messagesIsLoading) return <div>Loading messages...</div>;
  if (messagesIsError) return <div>Error fetching messages</div>;

  return (
    <div className="bg-vl-blue p-4 h-full flex flex-col justify-between">
      <div className="flex-grow">
        {messages &&
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                studentDetail.first_name + " " + studentDetail.last_name ===
                msg.sender_details.name
                  ? "justify-end"
                  : "justify-start"
              } mb-4`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  studentDetail.first_name + " " + studentDetail.last_name ===
                  msg.sender_details.name
                    ? "bg-bs text-white"
                    : "bg-lp-blue text-vd-grey"
                }`}
              >
                {studentDetail.first_name + " " + studentDetail.last_name ===
                msg.sender_details.name
                  ? `${msg.sender_details.name}: ${msg.content}`
                  : msg.content}
              </div>
            </div>
          ))}
      </div>
      <form className="flex items-center p-2 border-t border-md-grey sticky bottom-0">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-md-grey rounded-md mr-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-md-blue text-white p-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default GroupChat;
