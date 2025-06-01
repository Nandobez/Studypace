package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.model.User;

public interface ProgressObserver {
    void onProgressUpdate(User student, String progress);

    class TeacherNotifier implements ProgressObserver {
        @Override
        public void onProgressUpdate(User student, String progress) {
            System.out.println("Teacher notified: Student " + student.getName() + " progress: " + progress);
        }
    }
}