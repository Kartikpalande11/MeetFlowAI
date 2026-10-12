package com.aiMeeting.taskmanager.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aiMeeting.taskmanager.entity.User;
import com.aiMeeting.taskmanager.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already registered";
        }

        // Hash password before saving
        String hashedPassword =
                passwordEncoder.encode(
                        user.getPassword()
                );

        user.setPassword(hashedPassword);

        userRepository.save(user);

        return "Registration successful";
    }

    public User login(
            String email,
            String password) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElse(null);

        if (user == null) {
            return null;
        }

        // Compare entered password with BCrypt hash
        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            return null;
        }

        return user;
    }
}