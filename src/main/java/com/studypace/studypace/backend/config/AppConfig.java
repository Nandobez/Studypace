package com.studypace.studypace.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@Configuration
@EnableConfigurationProperties(AppProperties.class)
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public GeminiApiClient geminiApiClient(AppProperties appProperties, RestTemplate restTemplate) {
        return GeminiApiClient.getInstance(appProperties, restTemplate);
    }
}