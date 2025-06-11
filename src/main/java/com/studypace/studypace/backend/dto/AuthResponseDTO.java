package com.studypace.studypace.backend.dto;

import com.studypace.studypace.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDTO {
    private String token;
    private User user;
}