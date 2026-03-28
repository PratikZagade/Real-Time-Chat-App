import { useEffect, useRef, useState } from "react";
import ChatArea from "./ChatArea";
import "./ChatPage.css";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../../api/chatService";

// ✅ Get logged-in user
const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const ChatPage = () => {
  const user = getUser();

  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("connecting");
  const [onlineUsers, setOnlineUsers] = useState({});

  // ✅ Prevent double connection
  const isConnectedRef = useRef(false);

  useEffect(() => {
    if (isConnectedRef.current) return;

    isConnectedRef.current = true;

    connectWebSocket(
      // 💬 Handle messages
      (message) => {
        setMessages((prev) => {
          const exists = prev.some(
            (msg) =>
              (msg.tempId && msg.tempId === message.tempId) ||
              (msg.content === message.content &&
                msg.senderId === message.senderId)
          );

          if (exists) return prev;

          return [...prev, message];
        });
      },

      // 🔗 Connection status
      setStatus,

      // 👤 User status
      (updatedUser) => {
        setOnlineUsers((prev) => ({
          ...prev,
          [updatedUser.id]: updatedUser.status,
        }));
      }
    );

    // ❌ IMPORTANT: DO NOT DISCONNECT HERE
    return () => {};
  }, []);

  const handleLogout = () => {
    disconnectWebSocket(); // ✅ ONLY here
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth";
  };

  const myStatus =
    onlineUsers[user?.id] ||
    (status === "connected" ? "ONLINE" : "OFFLINE");

  return (
    <div className="main-container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="user-info">
          <h3>Welcome</h3>
          <p><strong>Name:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>

          <p>
            <strong>Status:</strong>{" "}
            {myStatus === "ONLINE" ? "🟢 Online" : "🔴 Offline"}
          </p>
        </div>

        <div className={`status ${status}`}>
          {status === "connected" && "🟢 Connected"}
          {status === "connecting" && "🟡 Connecting..."}
          {status === "reconnecting" && "🟡 Reconnecting..."}
          {status === "disconnected" && "🔴 Disconnected"}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <ChatArea
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default ChatPage;