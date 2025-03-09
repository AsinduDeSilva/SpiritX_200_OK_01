package com.example.secureconnect.controller;

import com.example.secureconnect.dto.AuthRequestDTO;
import com.example.secureconnect.dto.AuthResponseDTO;
import com.example.secureconnect.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequestDTO) {
        AuthResponseDTO authResponseDTO = authService.login(authRequestDTO);

        if (authResponseDTO.isSuccess()) {
            return ResponseEntity.ok(authResponseDTO);
        }

        return ResponseEntity.badRequest().body(authResponseDTO);
    }

    @PostMapping("signup")
    public ResponseEntity<AuthResponseDTO> signup(@RequestBody AuthRequestDTO authRequestDTO) {
        AuthResponseDTO authResponseDTO = authService.signup(authRequestDTO);
        if (authResponseDTO.isSuccess()) {
            return ResponseEntity.ok(authResponseDTO);
        }
        return ResponseEntity.badRequest().body(authResponseDTO);
    }
}
