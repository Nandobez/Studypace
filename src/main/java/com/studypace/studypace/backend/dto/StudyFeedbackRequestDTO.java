package com.studypace.studypace.backend.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class StudyFeedbackRequestDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private String subject;
}