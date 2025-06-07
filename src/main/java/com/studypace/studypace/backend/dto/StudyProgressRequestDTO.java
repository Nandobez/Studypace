package com.studypace.studypace.backend.dto;

import java.time.LocalDateTime;

import java.time.LocalDate;
import lombok.Data;

@Data
public class StudyProgressRequestDTO {
    private Long scheduleId;
    private LocalDate studyDate;
    private String subject;
    private String topic;
    private int studiedHours;
    private Double comprehensionPercentage;
    private String notes;
}