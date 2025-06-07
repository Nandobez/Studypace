package com.studypace.studypace.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferencesDTO {

    @NotBlank(message = "Study goals cannot be blank")
    @JsonProperty("studyGoals")
    private String studyGoals;

    @NotBlank(message = "Preferred subjects cannot be blank")
    @JsonProperty("preferredSubjects")
    private String preferredSubjects;

    @Min(value = 1, message = "Daily study hours must be at least 1")
    @JsonProperty("dailyStudyHours")
    private int dailyStudyHours;
}