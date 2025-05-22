package com.studypace.studypace.backend.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private long maxTotalFileBytes = 80 * 1024 * 1024; // 80 MB
    private String geminiEndpoint;
    private String geminiApiKey;
    private String jwtSecret;
    private long jwtExpiration;
}