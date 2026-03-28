package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ChatMessageDTO;
import com.example.demo.service.ChatService;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    // ✅ Send Message (FIXED - NEW API)
    @PostMapping("/send")
    public ResponseEntity<ChatMessageDTO> sendMessage(
            @RequestBody ChatMessageDTO messageDTO,
            Authentication authentication) {

        String username = authentication.getName(); // from JWT

        return ResponseEntity.ok(
                chatService.saveMessageWithUsername(username, messageDTO)
        );
    }

    // ✅ Get chat messages between logged-in user and another user (FIXED)
    @GetMapping("/messages/{userId}")
    public ResponseEntity<List<ChatMessageDTO>> getMessages(
            @PathVariable Long userId,
            Authentication authentication) {

        String username = authentication.getName(); // from JWT

        return ResponseEntity.ok(
                chatService.getChatMessagesByUsername(username, userId)
        );
    }
}