package com.studypace.studypace.backend.dto;

import lombok.Data;

@Data
public class FileUploadResponseDTO {
    private String filename;
    private long size;
}
