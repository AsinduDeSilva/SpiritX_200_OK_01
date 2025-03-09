package com.example.secureconnect.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResponseDTO {
    private boolean success;
    private int code;
    private String message;
}
