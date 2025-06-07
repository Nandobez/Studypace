package com.studypace.studypace.backend.dto;

import com.studypace.studypace.backend.model.UserPreferences;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.*;

@Data
@Builder
public class StudyScheduleRequestDTO {
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate dateEndDate;
    private List<String> subjects;
    private List<String> priorityTopics;
    private int dailyHours;
    private String studyType;
    private String purpose;
    private String preferredMethods;
}