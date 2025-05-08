package com.studypace.studypace.backend.dto;

import lombok.Data;

@Data
public class PromptRequestDTO {
    private String email;
    private String password;
    private String prompt;
}
