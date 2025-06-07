package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.config.AppProperties;
import com.studypace.studypace.backend.model.StudyFile;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.repository.StudyFileRepository;
import com.studypace.studypace.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final StudyFileRepository fileRepository;
    private final UserRepository userRepository;
    private final AppProperties appProperties;

    @Transactional
    public StudyFile uploadFile(Long userId, MultipartFile file, String description) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        validateFile(file);

        Long totalSize = fileRepository.getTotalFileSizeByUserId(userId);
        if (totalSize != null && totalSize + file.getSize() > appProperties.getMaxTotalFileBytes()) {
            throw new IllegalStateException("Total file size exceeds 80MB limit");
        }

        String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path filePath = Paths.get(appProperties.getFileStorage().getUploadPath(), filename);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        StudyFile studyFile = StudyFile.builder()
                .filename(filename)
                .originalFilename(file.getOriginalFilename())
                .contentType(file.getContentType())
                .fileSize(file.getSize())
                .filePath(filePath.toString())
                .fileContent(file.getBytes())
                .user(user)
                .description(description)
                .fileType(determineFileType(file.getOriginalFilename()))
                .build();

        return fileRepository.save(studyFile);
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        if (file.getSize() > appProperties.getFileStorage().getMaxFileSize()) {
            throw new IllegalArgumentException("File size exceeds 10MB limit");
        }
        String extension = getFileExtension(file.getOriginalFilename());
        if (!Arrays.asList(appProperties.getFileStorage().getAllowedExtensions()).contains(extension)) {
            throw new IllegalArgumentException("Invalid file extension: " + extension);
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
    }

    private StudyFile.FileType determineFileType(String filename) {
        String extension = getFileExtension(filename);
        return switch (extension) {
            case "pdf" -> StudyFile.FileType.PDF;
            case "doc", "docx" -> StudyFile.FileType.DOC;
            case "txt" -> StudyFile.FileType.TXT;
            default -> StudyFile.FileType.OTHER;
        };
    }
}