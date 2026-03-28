package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Message;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

	// Get messages between two users
	List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(Long senderId, Long receiverId, Long receiverId2,
			Long senderId2);
}