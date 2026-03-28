package com.example.demo.service;

import java.util.List;
import com.example.demo.dto.ChatMessageDTO;

public interface ChatService {

    // Get chat messages between two users (existing)
    List<ChatMessageDTO> getChatMessages(Long senderId, Long receiverId);

    // Save message (existing - optional for WebSocket)
    ChatMessageDTO saveMessage(ChatMessageDTO messageDTO);

    // ✅ NEW: Get messages using JWT username
    List<ChatMessageDTO> getChatMessagesByUsername(String username, Long otherUserId);

    // ✅ NEW: Save message using JWT username
    ChatMessageDTO saveMessageWithUsername(String username, ChatMessageDTO messageDTO);
}