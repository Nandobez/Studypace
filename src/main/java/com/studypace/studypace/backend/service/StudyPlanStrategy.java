package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.model.Student;
import com.studypace.studypace.backend.model.Teacher;
import com.studypace.studypace.backend.model.User;

public interface StudyPlanStrategy {
    String generatePlan(User user);

    class StudentStudyPlan implements StudyPlanStrategy {
        @Override
        public String generatePlan(User user) {
            return "Student plan for " + user.getName() + ": Focus on " + ((Student) user).getStudyLevel() + " level topics.";
        }
    }

    class TeacherStudyPlan implements StudyPlanStrategy {
        @Override
        public String generatePlan(User user) {
            return "Teacher plan for " + user.getName() + ": Monitor students in " + ((Teacher) user).getSpecialization();
        }
    }
}