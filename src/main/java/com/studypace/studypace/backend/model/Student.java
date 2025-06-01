package com.studypace.studypace.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Student extends User {
    private String studyLevel;

    public Student(Long id, String name, String email, String password, Role role, boolean active, UserPreferences preferences, String studyLevel) {
        super(id, name, email, password, role, active, preferences);
        this.studyLevel = studyLevel;
    }
}