package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.model.Student;
import com.studypace.studypace.backend.model.Teacher;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.model.UserPreferences;

public class UserFactory {
    public static User createUser(String role, String name, String email, String password, boolean active) {
        UserPreferences preferences = UserPreferences.builder()
                .studyGoals("General Learning")
                .preferredSubjects("All")
                .dailyStudyHours(2)
                .build();
        return switch (role.toUpperCase()) {
            case "STUDENT" -> new Student(null, name, email, password, User.Role.STUDENT, active, preferences, "beginner");
            case "TEACHER" -> new Teacher(null, name, email, password, User.Role.TEACHER, active, preferences, "general");
            default -> throw new IllegalArgumentException("Invalid role: " + role);
        };
    }
}