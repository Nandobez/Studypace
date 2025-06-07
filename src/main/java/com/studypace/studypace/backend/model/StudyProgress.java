package com.studypace.studypace.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "study_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private StudySchedule schedule;

    @Column(nullable = false)
    private LocalDate studyDate;

    @Column(nullable = false)
    private String subject;

    private String topic;

    @Column(nullable = false)
    private int studiedHours;

    @Column(scale = 2)
    private Double comprehensionPercentage;

    @Column(length = 1000)
    private String notes;

    @Column(length = 2000)
    private String aiGeneratedFeedback;

    @Column(nullable = false)
    private LocalDateTime recordedAt;

    @PrePersist
    protected void onCreate() {
        recordedAt = LocalDateTime.now();
    }
}