package com.studypace.studypace.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.studypace.studypace.backend.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class StudyPaceApplication {
	public static void main(String[] args) {
		SpringApplication.run(StudyPaceApplication.class, args);
	}
}