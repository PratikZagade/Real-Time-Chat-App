package com.example.demo.websocket;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class UserHandshakeInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            org.springframework.http.server.ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes) {

        try {
            if (request instanceof ServletServerHttpRequest servletRequest) {

                HttpServletRequest httpRequest = servletRequest.getServletRequest();

                // ✅ SAFE way to get query param
                String userId = httpRequest.getParameter("userId");

                if (userId != null && !userId.isEmpty()) {
                    attributes.put("userId", userId);

                    System.out.println("🔥 userId stored in session: " + userId);
                } else {
                    System.out.println("❌ userId NOT FOUND");
                }
            }
        } catch (Exception e) {
            System.out.println("❌ Error in Handshake: " + e.getMessage());
        }

        return true;
    }

    @Override
    public void afterHandshake(
            ServerHttpRequest request,
            org.springframework.http.server.ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Exception exception) {
        // Not needed
    }
}