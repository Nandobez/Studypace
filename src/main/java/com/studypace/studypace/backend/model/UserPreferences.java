package com.studypace.studypace.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_preferences")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studyGoals; // e.g., "Prepare for ENEM"
    private String preferredSubjects; // e.g., "Math,Physics"
    private int dailyStudyHours;
}