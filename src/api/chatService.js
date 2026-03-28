import axios from "./axiosConfig";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;
let isConnected = false;
let messageQueue = []; // ✅ QUEUE

// ✅ CONNECT WEBSOCKET
export const connectWebSocket = (
  onMessageReceived,
  setStatus,
  onUserStatusChange
) => {
  if (stompClient && stompClient.active) {
    console.log("⚠️ Already connected");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user?.id) {
    console.error("❌ User not found");
    return;
  }

  const socket = new SockJS(
    `http://localhost:8080/ws?userId=${user.id}`
  );

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,

    beforeConnect: () => {
      console.log("⏳ Connecting...");
      isConnected = false;
      setStatus && setStatus("connecting");
    },

    onConnect: () => {
      console.log("✅ Connected to WebSocket");
      isConnected = true;
      setStatus && setStatus("connected");

      // ✅ USE LOCAL client ALWAYS
      client.subscribe("/topic/messages", (message) => {
        try {
          const body = JSON.parse(message.body);
          onMessageReceived && onMessageReceived(body);
        } catch (err) {
          console.error("Parse error:", err);
        }
      });

      client.subscribe("/topic/user-status", (message) => {
        try {
          const body = JSON.parse(message.body);
          onUserStatusChange && onUserStatusChange(body);
        } catch (err) {
          console.error("Parse error:", err);
        }
      });

      // ✅ SEND QUEUED MESSAGES
      messageQueue.forEach((msg) => {
        client.publish({
          destination: "/app/send",
          body: JSON.stringify(msg),
        });
      });

      messageQueue = [];
    },

    onDisconnect: () => {
      console.log("🔌 Disconnected");
      isConnected = false;
      setStatus && setStatus("disconnected");
    },

    onWebSocketClose: () => {
      console.log("⚠️ Reconnecting...");
      isConnected = false;
      setStatus && setStatus("reconnecting");
    },

    onWebSocketError: (error) => {
      console.error("❌ WebSocket error:", error);
      isConnected = false;
      setStatus && setStatus("disconnected");
    },

    onStompError: (frame) => {
      console.error("❌ STOMP error:", frame);
    },
  });

  // ✅ IMPORTANT: assign AFTER
  stompClient = client;

  client.activate();
};

// ✅ SEND MESSAGE (FINAL FIX)
export const sendMessageWS = (message) => {
  if (stompClient && isConnected) {
    stompClient.publish({
      destination: "/app/send",
      body: JSON.stringify(message),
    });
  } else {
    console.warn("⏳ Not connected, queueing message...");
    messageQueue.push(message); // ✅ FIX
  }
};

// ✅ DISCONNECT
export const disconnectWebSocket = async () => {
  if (stompClient) {
    try {
      console.log("🔌 Disconnecting...");
      await stompClient.deactivate();
      console.log("✅ Disconnected");
    } catch (err) {
      console.error("❌ Disconnect error:", err);
    }

    stompClient = null;
    isConnected = false;
  }
};

// ✅ FETCH MESSAGES
export const getMessages = (receiverId) => {
  return axios.get(`/chat/messages/${receiverId}`);
};