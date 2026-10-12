package com.aiMeeting.taskmanager.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aiMeeting.taskmanager.entity.User;
import com.aiMeeting.taskmanager.security.JwtUtil;
import com.aiMeeting.taskmanager.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(
            AuthService authService,
            JwtUtil jwtUtil) {

        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody User user) {

        return authService.register(user);
    }

    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody Map<String, String> loginData) {

        String email =
                loginData.get("email");

        String password =
                loginData.get("password");

        User user =
                authService.login(
                        email,
                        password
                );

        if (user == null) {

            return Map.of(
                    "message",
                    "Invalid email or password"
            );
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );

        return Map.of(
                "message",
                "Login successful",
                "token",
                token,
                "name",
                user.getName(),
                "email",
                user.getEmail()
        );
    }
}