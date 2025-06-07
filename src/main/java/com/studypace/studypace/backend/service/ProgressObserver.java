package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.model.User;

public interface ProgressObserver {
    void onProgressUpdate(User student, String progress);
}