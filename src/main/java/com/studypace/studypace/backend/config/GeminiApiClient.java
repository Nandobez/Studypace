package com.studypace.studypace.backend.config;

import org.springframework.web.client.RestTemplate;

// Singleton Pattern Implementation
public class GeminiApiClient {
    private static volatile GeminiApiClient instance;
    private final AppProperties appProperties;
    private final RestTemplate restTemplate;

    private GeminiApiClient(AppProperties appProperties, RestTemplate restTemplate) {
        this.appProperties = appProperties;
        this.restTemplate = restTemplate;
    }

    public static GeminiApiClient getInstance(AppProperties appProperties, RestTemplate restTemplate) {
        if (instance == null) {
            synchronized (GeminiApiClient.class) {
                if (instance == null) {
                    instance = new GeminiApiClient(appProperties, restTemplate);
                }
            }
        }
        return instance;
    }

    public AppProperties getAppProperties() {
        return appProperties;
    }

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }
}
