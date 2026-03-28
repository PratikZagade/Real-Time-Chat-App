import { useState } from "react";
import { sendMessageWS } from "../../api/chatService";

// ✅ Get logged-in user
const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const MessageInput = ({ setMessages }) => {
  const [message, setMessage] = useState("");
  const user = getUser();

  // 🔴 TEMP: fixed receiver (for testing)
  const receiverId = 2;

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    if (!user?.id) {
      console.error("❌ User not found");
      return;
    }

    const data = {
      senderId: user.id,
      receiverId: receiverId,
      content: trimmedMessage,
      tempId: Date.now(), // ✅ unique ID
    };

    // ✅ SAFE UI UPDATE (only if setMessages exists)
    if (setMessages) {
      setMessages((prev) => [...prev, data]);
    }

    // ✅ Send via WebSocket
    sendMessageWS(data);

    setMessage("");
  };

  // ✅ ENTER KEY SUPPORT
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      className="d-flex p-2"
      style={{ borderTop: "2px solid #ccc" }}
    >
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button
        className="btn btn-primary"
        onClick={handleSend}
        disabled={!message.trim()} // ✅ disable empty send
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;