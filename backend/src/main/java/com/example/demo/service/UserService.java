package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.UserDTO;

public interface UserService {

    // ✅ Get all users
    List<UserDTO> getAllUsers();

    // ✅ Get user by ID
    UserDTO getUserById(Long id);

    // ✅ Get user by Email (🔥 ADD THIS)
    UserDTO getUserByEmail(String email);

    // ✅ Update user status (ONLINE/OFFLINE)
    void updateUserStatus(Long id, String status);
}