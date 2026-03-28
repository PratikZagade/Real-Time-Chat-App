package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.dto.UserDTO;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    // ✅ REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            Object response = authService.register(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Registration Failed", "message", e.getMessage()));
        }
    }

    // ✅ LOGIN USER (FINAL 🔥)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            // ✅ Generate token
            String token = authService.login(request);

            // ✅ Get user details
            UserDTO user = userService.getUserByEmail(request.getEmail());

            // ✅ Return structured response
            return ResponseEntity.ok(
                    Map.of(
                            "token", token,
                            "user", user
                    )
            );

        } catch (Exception e) {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("error", "Invalid Credentials"));
        }
    }
}