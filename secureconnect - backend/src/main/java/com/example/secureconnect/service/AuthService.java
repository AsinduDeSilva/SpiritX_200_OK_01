package com.example.secureconnect.service;

import com.example.secureconnect.dto.AuthRequestDTO;
import com.example.secureconnect.dto.AuthResponseDTO;
import com.example.secureconnect.entity.User;
import com.example.secureconnect.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    public AuthResponseDTO login(AuthRequestDTO authRequestDTO) {
        Optional<User> userOptional = userRepo.findByUsernameAndPassword(
                authRequestDTO.getUsername(), authRequestDTO.getPassword()
        );

        if (userOptional.isEmpty()) {
            return new AuthResponseDTO(false, 1, "Wrong username or password");
        }

        return new AuthResponseDTO(true, 0, "Login successful");
    }

    public AuthResponseDTO signup(AuthRequestDTO authRequestDTO) {
        Optional<User> userOptional = userRepo.findByUsername(authRequestDTO.getUsername());
        if (userOptional.isPresent()) {
            return new AuthResponseDTO(false, 2, "User already exists");
        }

        userRepo.save(new User(authRequestDTO.getUsername(), authRequestDTO.getPassword()));
        return new AuthResponseDTO(true, 0, "Sign up successful");
    }
}
