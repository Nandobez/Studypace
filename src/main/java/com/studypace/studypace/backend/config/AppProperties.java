package com.studypace.studypace.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private long maxTotalFileBytes = 80 * 1024 * 1024; // 80 MB
    private String geminiEndpoint;
    private String geminiApiKey;
    private Jwt jwt = new Jwt();
    private FileStorage fileStorage = new FileStorage();

    @Data
    public static class Jwt {
        private String secret;
        private long expiration = 86400000; // 24 hours
    }

    @Data
    public static class FileStorage {
        private String uploadPath = "./uploads/";
        private long maxFileSize = 10 * 1024 * 1024; // 10 MB per file
        private String[] allowedExtensions = {"pdf", "txt", "docx", "pptx", "xlsx"};
    }
}