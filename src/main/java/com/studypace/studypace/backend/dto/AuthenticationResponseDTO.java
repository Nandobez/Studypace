package com.studypace.studypace.backend.dto;

import lombok.Data;

@Data
public class AuthenticationResponseDTO {
    private String jwt;

    public AuthenticationResponseDTO(String jwt) {
        this.jwt = jwt;
    }
}