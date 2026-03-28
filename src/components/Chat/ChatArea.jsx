import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

// ✅ Get logged-in user
const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const ChatArea = ({ messages, setMessages }) => {
  const user = getUser();

  // ✅ Auto-scroll to bottom
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="d-flex flex-column h-100">
      
      {/* Header */}
      <div className="p-3 border-bottom">
        <strong>Chat</strong>
      </div>

      {/* Messages */}
      <div
        className="flex-grow-1 p-3"
        style={{
          overflowY: "auto",
          borderBottom: "2px solid #ccc"
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-2 ${
              msg.senderId === user?.id
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded ${
                msg.senderId === user?.id
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* ✅ Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* ✅ FIX: pass setMessages */}
      <MessageInput setMessages={setMessages} />
    </div>
  );
};

export default ChatArea;