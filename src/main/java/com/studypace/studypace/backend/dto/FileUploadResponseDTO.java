package com.studypace.studypace.backend.dto;

import lombok.Data;

@Data
public class FileUploadResponseDTO {
    private String filename;
    private String originalFilename;
    private long size;

    public FileUploadResponseDTO(String filename, String originalFilename, long size) {
        this.filename = filename;
        this.originalFilename = originalFilename;
        this.size = size;
    }
}