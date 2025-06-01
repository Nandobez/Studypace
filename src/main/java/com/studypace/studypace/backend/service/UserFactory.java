package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.model.Student;
import com.studypace.studypace.backend.model.Teacher;
import com.studypace.studypace.backend.model.User;

public interface UserFactory {
    static User createUser(String role, String name, String email, String password, boolean active) {
        return switch (role.toUpperCase()) {
            case "STUDENT" -> new Student(null, name, email, password, User.Role.STUDENT, active, null, "beginner");
            case "TEACHER" -> new Teacher(null, name, email, password, User.Role.TEACHER, active, null, "general");
            default -> throw new IllegalArgumentException("Invalid role: " + role);
        };
    }
}