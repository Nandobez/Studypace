package com.studypace.studypace.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserDTO {
    private String name;
    private String email;
    private String password;
    private String role;
    private boolean active;
}

