package com.studypace.studypace.backend.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

@Data
public class StudyScheduleDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<String> subjects;
    private List<String> priorityTopics;
    private int dailyStudyHours;
    private String geminiGeneratedContent;

    public StudyScheduleDTO(Long id, String title, String description, LocalDateTime startDate,
                            LocalDateTime endDate, List<String> subjects, List<String> priorityTopics,
                            int dailyStudyHours, String geminiContent) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.subjects = subjects;
        this.priorityTopics = priorityTopics;
        this.dailyStudyHours = dailyStudyHours;
        this.geminiGeneratedContent = geminiContent;
    }
}