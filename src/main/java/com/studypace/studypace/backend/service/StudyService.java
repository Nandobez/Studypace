package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.dto.*;
import com.studypace.studypace.backend.model.*;
import com.studypace.studypace.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final StudyScheduleRepository scheduleRepository;
    private final StudyProgressRepository progressRepository;
    private final StudentTeacherRelationRepository relationRepository;
    private final StudyFileRepository fileRepository;
    private final GeminiService geminiService;

    @Transactional
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public StudySchedule createStudySchedule(Long userId, StudyScheduleRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<StudyFile> userFiles = fileRepository.findByUserIdAndUploadDateTimeBetween(
                userId, request.getStartDate().atStartOfDay(), request.getDateEndDate().atTime(23, 59));

        String geminiContent = geminiService.generateStudySchedule(user, request, userFiles);

        StudySchedule schedule = StudySchedule.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate().atStartOfDay())
                .endDate(request.getDateEndDate().atTime(23, 59))
                .subjects(request.getSubjects())
                .priorityTopics(request.getPriorityTopics())
                .dailyStudyHours(request.getDailyHours())
                .geminiGeneratedContent(geminiContent)
                .status(StudySchedule.ScheduleStatus.ACTIVE)
                .build();

        return scheduleRepository.save(schedule);
    }

    @Transactional
    @PreAuthorize("hasRole('TEACHER')")
    public StudySchedule assignStudySchedule(Long studentId, StudyScheduleRequestDTO request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        Teacher teacher = getCurrentTeacher();
        if (!relationRepository.existsByStudentAndTeacherAndStatus(student, teacher, StudentTeacherRelation.RelationStatus.ACCEPTED)) {
            throw new IllegalStateException("No approved mentorship relation exists");
        }

        return createStudySchedule(studentId, request);
    }

    @Transactional
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public StudyProgress recordProgress(Long userId, StudyProgressRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        StudySchedule schedule = request.getScheduleId() != null
                ? scheduleRepository.findById(request.getScheduleId())
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found"))
                : null;

        StudyProgress progress = StudyProgress.builder()
                .user(user)
                .schedule(schedule)
                .studyDate(request.getStudyDate())
                .subject(request.getSubject())
                .topic(request.getTopic())
                .studiedHours(request.getStudiedHours())
                .comprehensionPercentage(request.getComprehensionPercentage())
                .notes(request.getNotes())
                .build();

        StudyProgress savedProgress = progressRepository.save(progress);
        user.notifyObservers("Progress recorded: " + request.getSubject() + ", " + request.getStudiedHours() + " hours");
        return savedProgress;
    }

    @Transactional
    @PreAuthorize("hasAnyRole('STUDENT', 'TEACHER')")
    public String generateFeedback(Long userId, StudyFeedbackRequestDTO request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<StudyProgress> progressList = progressRepository.findByUserIdAndStudyDateBetween(
                userId, request.getStartDate(), request.getEndDate());

        return geminiService.generateStudyFeedback(user, request, progressList);
    }

    @Transactional
    @PreAuthorize("hasRole('STUDENT')")
    public StudentTeacherRelation requestMentorship(Long studentId, Long teacherId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found"));

        if (relationRepository.existsByStudentAndTeacherAndStatus(student, teacher, StudentTeacherRelation.RelationStatus.PENDING)) {
            throw new IllegalStateException("Mentorship request already pending");
        }

        StudentTeacherRelation relation = StudentTeacherRelation.builder()
                .student(student)
                .teacher(teacher)
                .status(StudentTeacherRelation.RelationStatus.PENDING)
                .build();

        student.addObserver(teacher);
        return relationRepository.save(relation);
    }

    @Transactional
    @PreAuthorize("hasRole('TEACHER')")
    public StudentTeacherRelation updateMentorship(Long relationId, String status) {
        StudentTeacherRelation relation = relationRepository.findById(relationId)
                .orElseThrow(() -> new IllegalArgumentException("Relation not found"));

        Teacher currentTeacher = getCurrentTeacher();
        if (!relation.getTeacher().getId().equals(currentTeacher.getId())) {
            throw new IllegalStateException("Only the assigned teacher can update");
        }

        relation.setStatus(StudentTeacherRelation.RelationStatus.valueOf(status.toUpperCase()));
        if (status.equalsIgnoreCase("ACCEPTED")) {
            relation.setAcceptedAt(LocalDateTime.now());
        }
        return relationRepository.save(relation);
    }

    @Transactional
    @PreAuthorize("hasRole('TEACHER')")
    public UserPreferences updateStudentPreferences(Long studentId, UserPreferencesDTO request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        Teacher teacher = getCurrentTeacher();
        if (!relationRepository.existsByStudentAndTeacherAndStatus(student, teacher, StudentTeacherRelation.RelationStatus.ACCEPTED)) {
            throw new IllegalStateException("No approved mentorship relation exists");
        }

        UserPreferences preferences = student.getPreferences();
        if (preferences == null) {
            preferences = UserPreferences.builder()
                    .studyGoals("General Learning")
                    .preferredSubjects("All")
                    .dailyStudyHours(2)
                    .build();
            student.setPreferences(preferences);
        }

        preferences.setStudyGoals(request.getStudyGoals());
        preferences.setPreferredSubjects(request.getPreferredSubjects());
        preferences.setDailyStudyHours(request.getDailyStudyHours());
        userRepository.save(student);
        return preferences;
    }

    private Teacher getCurrentTeacher() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (currentUser.getRole() != User.Role.TEACHER) {
            throw new IllegalStateException("Current user is not a teacher");
        }
        return teacherRepository.findById(currentUser.getId())
                .orElseThrow(() -> new IllegalStateException("Teacher not found"));
    }
}