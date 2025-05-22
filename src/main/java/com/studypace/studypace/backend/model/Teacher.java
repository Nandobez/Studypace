package com.studypace.studypace.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "teacher")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Teacher extends User {
    private String specialization;

    public Teacher(Long id, String name, String email, String password, Role role, boolean active, UserPreferences preferences, String specialization) {
        super(id, name, email, password, role, active, preferences);
        this.specialization = specialization;
    }
}