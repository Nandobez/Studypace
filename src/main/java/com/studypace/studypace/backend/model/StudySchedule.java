package com.studypace.studypace.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "study_schedule")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudySchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @ElementCollection
    @CollectionTable(name = "schedule_subjects", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "subject")
    private List<String> subjects;

    @ElementCollection
    @CollectionTable(name = "schedule_priority_topics", joinColumns = @JoinColumn(name = "schedule_id"))
    @Column(name = "topic")
    private List<String> priorityTopics;

    @Column(nullable = false)
    private int dailyStudyHours;

    @Column(length = 3500)
    private String geminiGeneratedContent;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime lastUpdated;

    @Enumerated(EnumType.STRING)
    private ScheduleStatus status;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
        if (status == null) {
            status = ScheduleStatus.ACTIVE;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }

    public String getGeminiContent() {
        return geminiGeneratedContent;
    }

    public enum ScheduleStatus {
        ACTIVE, PAUSED, COMPLETED, CANCELLED
    }
}