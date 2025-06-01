package com.studypace.studypace.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "\"user\"")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean active;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "preferences_id")
    private UserPreferences preferences;

    public enum Role {
        STUDENT, TEACHER
    }
}