package com.example.demo.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.demo.dto.ChatMessageDTO;
import com.example.demo.service.ChatService;

@Controller
public class ChatWebSocketController {

    private final ChatService chatService;

    public ChatWebSocketController(ChatService chatService) {
        this.chatService = chatService;
    }

    // ✅ PUBLIC BROADCAST (ALL USERS)
    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public ChatMessageDTO sendMessage(ChatMessageDTO messageDTO) {

        System.out.println("📩 Message: " + messageDTO.getContent());

        // save to DB
        return chatService.saveMessage(messageDTO);
    }
}