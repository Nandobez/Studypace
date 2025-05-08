package com.studypace.studypace.backend.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import lombok.Data;

@Data
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    /** Limite total de arquivos por usuário (bytes) */
    private long maxTotalFileBytes = 80 * 1024 * 1024;
    /** Endpoint da API Gemini */
    private String geminiEndpoint;
    /** Chave de API Gemini */
    @Getter
    private String geminiApiKey;

}
