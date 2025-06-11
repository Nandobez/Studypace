package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.dto.UserDTO;
import com.studypace.studypace.backend.dto.UserPreferencesDTO;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.model.UserPreferences;
import com.studypace.studypace.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(UserDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        User user = UserFactory.createUser(dto.getRole(), dto.getName(), dto.getEmail(),
                passwordEncoder.encode(dto.getPassword()), dto.isActive());
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public Optional<User> updateUser(Long id, UserDTO dto) {
        return userRepository.findById(id).map(user -> {
            user.setName(dto.getName());
            user.setEmail(dto.getEmail());
            if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(dto.getPassword()));
            }
            user.setActive(dto.isActive());
            return userRepository.save(user);
        });
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public UserPreferences updatePreferences(Long userId, UserPreferencesDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        UserPreferences prefs = user.getPreferences();
        if (prefs == null) {
            prefs = UserPreferences.builder()
                    .studyGoals("General Learning")
                    .preferredSubjects("All")
                    .dailyStudyHours(2)
                    .build();
            user.setPreferences(prefs);
        }
        prefs.setStudyGoals(dto.getStudyGoals());
        prefs.setPreferredSubjects(dto.getPreferredSubjects());
        prefs.setDailyStudyHours(dto.getDailyStudyHours());
        userRepository.save(user);
        return prefs;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}