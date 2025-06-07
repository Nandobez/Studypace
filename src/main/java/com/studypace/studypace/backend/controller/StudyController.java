package com.studypace.studypace.backend.controller;

import com.studypace.studypace.backend.dto.*;
import com.studypace.studypace.backend.model.StudentTeacherRelation;
import com.studypace.studypace.backend.model.StudyFile;
import com.studypace.studypace.backend.model.StudyProgress;
import com.studypace.studypace.backend.model.StudySchedule;
import com.studypace.studypace.backend.model.StudentTeacherRelation;
import com.studypace.studypace.backend.service.FileService;
import com.studypace.studypace.backend.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/study")
@RequiredArgsConstructor
public class StudyController {

    private final StudyService studyService;
    private final FileService fileService;

    @PostMapping("/{userId}/schedule")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<StudyScheduleDTO> createSchedule(@PathVariable Long userId, @RequestBody StudyScheduleRequestDTO request) {
        StudySchedule schedule = studyService.createStudySchedule(userId, request);
        return ResponseEntity.ok(new StudyScheduleDTO(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getDescription(),
                schedule.getStartDate(),
                schedule.getEndDate(),
                schedule.getSubjects(),
                schedule.getPriorityTopics(),
                schedule.getDailyStudyHours(),
                schedule.getGeminiContent()));
    }

    @PostMapping("/teacher/{studentId}/schedule")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<StudyScheduleDTO> assignSchedule(@PathVariable Long studentId, @RequestBody StudyScheduleRequestDTO request) {
        StudySchedule schedule = studyService.assignStudySchedule(studentId, request);
        return ResponseEntity.ok(new StudyScheduleDTO(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getDescription(),
                schedule.getStartDate(),
                schedule.getEndDate(),
                schedule.getSubjects(),
                schedule.getPriorityTopics(),
                schedule.getDailyStudyHours(),
                schedule.getGeminiContent()));
    }

    @PostMapping("/{userId}/progress")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<StudyProgressDTO> recordProgress(@PathVariable Long userId, @RequestBody StudyProgressRequestDTO request) {
        StudyProgress progress = studyService.recordProgress(userId, request);
        return ResponseEntity.ok(new StudyProgressDTO(
                progress.getId(),
                progress.getStudyDate(),
                progress.getSubject(),
                progress.getTopic(),
                progress.getStudiedHours(),
                progress.getComprehensionPercentage(),
                progress.getNotes()));
    }

    @PostMapping("/{userId}/feedback")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<String> generateFeedback(@PathVariable Long userId, @RequestBody StudyFeedbackRequestDTO request) {
        String feedback = studyService.generateFeedback(userId, request);
        return ResponseEntity.ok(feedback);
    }

    @PostMapping("/{userId}/upload")
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public ResponseEntity<FileUploadResponseDTO> uploadFile(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "description", required = false) String description) {
        try {
            StudyFile uploadedFile = fileService.uploadFile(userId, file, description);
            return ResponseEntity.ok(new FileUploadResponseDTO(
                    uploadedFile.getFilename(),
                    uploadedFile.getOriginalFilename(),
                    uploadedFile.getFileSize()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new FileUploadResponseDTO(null, null, 0));
        }
    }

    @PostMapping("/student/{studentId}/mentorship/{teacherId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> requestMentorship(@PathVariable Long studentId, @PathVariable Long teacherId) {
        StudentTeacherRelation relation = studyService.requestMentorship(studentId, teacherId);
        return ResponseEntity.ok("Mentorship request sent with ID: " + relation.getId());
    }

    @PutMapping("/teacher/mentorship/{relationId}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<String> updateMentorship(@PathVariable Long relationId, @RequestBody UpdateMentorshipRequestDTO request) {
        StudentTeacherRelation relation = studyService.updateMentorship(relationId, request.getStatus());
        return ResponseEntity.ok("Mentorship updated to: " + relation.getStatus());
    }
}