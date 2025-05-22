package com.studypace.studypace.backend.dto;

import lombok.Data;

@Data
public class UserPreferencesDTO {
    private String studyGoals;
    private String preferredSubjects;
    private int dailyStudyHours;
}