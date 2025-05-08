package com.studypace.studypace.backend.controller;

import com.studypace.studypace.backend.dto.*;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> create(@RequestBody UserDTO dto) {
        return ResponseEntity.ok(userService.createUser(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody UserDTO dto) {
        return userService.updateUser(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/prompt")
    public ResponseEntity<PromptResponseDTO> prompt(@RequestBody PromptRequestDTO req) {
        return ResponseEntity.ok(userService.sendPrompt(req));
    }

    @PostMapping("/{id}/files")
    public ResponseEntity<List<FileUploadResponseDTO>> uploadFiles(
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files) throws Exception {
        return ResponseEntity.ok(userService.uploadFiles(id, files));
    }
}