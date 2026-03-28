package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;

public interface AuthService {

    // ✅ Register returns message (String is better than Object)
    String register(RegisterRequest request);

    // ✅ Login returns JWT token
    String login(LoginRequest request);
}