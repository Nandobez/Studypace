package com.studypace.studypace.backend.controller;

import com.studypace.studypace.backend.dto.UserDTO;
import com.studypace.studypace.backend.dto.UserPreferencesDTO;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.model.UserPreferences;
import com.studypace.studypace.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Arrays;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN')")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        if (!currentUser.getId().equals(id) && currentUser.getRole() != User.Role.ADMIN) {
            return ResponseEntity.status(403).build();
        }
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(new UserDTO(
                        user.getName(),
                        user.getEmail(),
                        null,
                        user.getRole().name(),
                        user.isActive())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasAnyRole('STUDENT', 'TEACHER') and authentication.principal.id == #id)")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        if (userDTO.getRole() != null && !isValidRole(userDTO.getRole())) {
            return ResponseEntity.badRequest().build();
        }
        return userService.updateUser(id, userDTO)
                .map(user -> ResponseEntity.ok(new UserDTO(
                        user.getName(),
                        user.getEmail(),
                        null,
                        user.getRole().name(),
                        user.isActive())))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/preferences")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER') and authentication.principal.id == #id")
    public ResponseEntity<UserPreferencesDTO> updatePreferences(@PathVariable Long id, @Valid @RequestBody UserPreferencesDTO preferencesDTO) {
        UserPreferences preferences = userService.updatePreferences(id, preferencesDTO);
        return ResponseEntity.ok(new UserPreferencesDTO(
                preferences.getStudyGoals(),
                preferences.getPreferredSubjects(),
                preferences.getDailyStudyHours()));
    }

    private boolean isValidRole(String role) {
        return Arrays.stream(User.Role.values())
                .anyMatch(r -> r.name().equalsIgnoreCase(role));
    }
}