package com.example.demo.websocket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Component
public class WebSocketEventListener {

    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // 🔥 sessionId → userId mapping
    private static final Map<String, Long> sessionUserMap = new ConcurrentHashMap<>();

    public WebSocketEventListener(UserRepository userRepository,
                                  SimpMessagingTemplate messagingTemplate) {
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
    }

    // 🟢 USER CONNECT
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = accessor.getSessionId();

        // ✅ FIX: Get from session attributes (set by interceptor)
        String userIdStr = (String) accessor.getSessionAttributes().get("userId");

        if (userIdStr != null) {
            Long userId = Long.parseLong(userIdStr);

            sessionUserMap.put(sessionId, userId);

            userRepository.findById(userId).ifPresent(user -> {
                user.setStatus("ONLINE");
                userRepository.save(user);

                System.out.println("🟢 User ONLINE: " + user.getUsername());

                // 🔥 Broadcast to all clients
                messagingTemplate.convertAndSend("/topic/user-status", user);
            });
        } else {
            System.out.println("❌ userId NOT FOUND in session");
        }
    }

    // 🔴 USER DISCONNECT
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {

        String sessionId = event.getSessionId();

        Long userId = sessionUserMap.get(sessionId);

        if (userId != null) {
            userRepository.findById(userId).ifPresent(user -> {
                user.setStatus("OFFLINE");
                userRepository.save(user);

                System.out.println("🔴 User OFFLINE: " + user.getUsername());

                // 🔥 Broadcast to all clients
                messagingTemplate.convertAndSend("/topic/user-status", user);
            });

            sessionUserMap.remove(sessionId);
        }

        System.out.println("🔌 User Disconnected");
    }
}