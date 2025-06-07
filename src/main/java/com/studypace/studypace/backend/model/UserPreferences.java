package com.studypace.studypace.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference; // IMPORTANTE: Adicionar para evitar loops infinitos em JSON
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

    @Column(nullable = false)
    private String studyGoals;

    @Column(nullable = false)
    private String preferredSubjects;

    @Column(nullable = false)
    private int dailyStudyHours;

    // --- LINHA ADICIONADA ---
    @OneToOne(mappedBy = "preferences")
    @JsonBackReference // Evita problemas de serialização (loop infinito)
    private User user;
}