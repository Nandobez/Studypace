package com.studypace.studypace.backend.dto;

import java.time.LocalDateTime;

import java.time.LocalDate;
import lombok.Data;

@Data
public class StudyProgressDTO {
    private Long id;
    private LocalDate studyDate;
    private String subject;
    private String topic;
    private int studiedHours;
    private Double comprehensionPercentage;
    private String notes;

    public StudyProgressDTO(Long id, LocalDate studyDate, String subject, String topic,
                            int studiedHours, Double comprehensionPercentage, String notes) {
        this.id = id;
        this.studyDate = studyDate;
        this.subject = subject;
        this.topic = topic;
        this.studiedHours = studiedHours;
        this.comprehensionPercentage = comprehensionPercentage;
        this.notes = notes;
    }
}