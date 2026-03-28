package com.example.demo.serviceimpl;

import org.springframework.stereotype.Service;

import com.example.demo.dto.ChatMessageDTO;
import com.example.demo.entity.Message;
import com.example.demo.entity.User;
import com.example.demo.repository.MessageRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ChatService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatServiceImpl implements ChatService {

	private final MessageRepository messageRepository;
	private final UserRepository userRepository; // ✅ ADD THIS

	public ChatServiceImpl(MessageRepository messageRepository, UserRepository userRepository) { // ✅ UPDATE CONSTRUCTOR
		this.messageRepository = messageRepository;
		this.userRepository = userRepository;
	}

	// ✅ EXISTING METHOD (NO CHANGE)
	@Override
	public List<ChatMessageDTO> getChatMessages(Long senderId, Long receiverId) {

		List<Message> messages = messageRepository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(senderId,
				receiverId, senderId, receiverId);

		return messages.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	// ✅ NEW METHOD (FOR GET API WITH JWT)
	@Override
	public List<ChatMessageDTO> getChatMessagesByUsername(String username, Long otherUserId) {

	    User currentUser = userRepository.findByEmail(username) // ✅ FIXED
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    return getChatMessages(currentUser.getId(), otherUserId);
	}

	// ✅ EXISTING METHOD (OPTIONAL - KEEP)
	@Override
	public ChatMessageDTO saveMessage(ChatMessageDTO dto) {

		Message message = new Message();
		message.setSenderId(dto.getSenderId());
		message.setReceiverId(dto.getReceiverId());
		message.setContent(dto.getContent());
		message.setTimestamp(LocalDateTime.now());

		Message saved = messageRepository.save(message);

		return convertToDTO(saved);
	}

	// ✅ NEW METHOD (FOR POST API WITH JWT)
	@Override
	public ChatMessageDTO saveMessageWithUsername(String username, ChatMessageDTO dto) {

	    User sender = userRepository.findByEmail(username) // ✅ FIXED
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    Message message = new Message();
	    message.setSenderId(sender.getId());
	    message.setReceiverId(dto.getReceiverId());
	    message.setContent(dto.getContent());
	    message.setTimestamp(LocalDateTime.now());

	    Message saved = messageRepository.save(message);

	    return convertToDTO(saved);
	}

	// Convert Entity → DTO
	private ChatMessageDTO convertToDTO(Message message) {
		ChatMessageDTO dto = new ChatMessageDTO();
		dto.setId(message.getId());
		dto.setSenderId(message.getSenderId());
		dto.setReceiverId(message.getReceiverId());
		dto.setContent(message.getContent());
		dto.setTimestamp(message.getTimestamp());
		return dto;
	}
}