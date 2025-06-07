package com.studypace.studypace.backend.repository;

import com.studypace.studypace.backend.model.StudyProgress;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.model.StudySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StudyProgressRepository extends JpaRepository<StudyProgress, Long> {
    List<StudyProgress> findByUser(User user);

    List<StudyProgress> findBySchedule(StudySchedule schedule);

    @Query("SELECT sp FROM StudyProgress sp WHERE sp.user.id = :userId AND sp.studyDate BETWEEN :startDate AND :endDate")
    List<StudyProgress> findByUserIdAndStudyDateBetween(@Param("userId") Long userId,
                                                        @Param("startDate") LocalDate startDate,
                                                        @Param("endDate") LocalDate endDate);

    @Query("SELECT AVG(sp.comprehensionPercentage) FROM StudyProgress sp WHERE sp.user.id = :userId AND sp.subject = :subject")
    Double getAverageComprehensionByUserIdAndSubject(@Param("userId") Long userId,
                                                     @Param("subject") String subject);

    @Query("SELECT SUM(sp.studiedHours) FROM StudyProgress sp WHERE sp.user.id = :userId AND sp.studyDate = :date")
    Integer getTotalStudiedHoursByUserIdAndDate(@Param("userId") Long userId,
                                                @Param("date") LocalDate date);

    @Query("SELECT sp FROM StudyProgress sp WHERE sp.user.id = :userId ORDER BY sp.studyDate DESC, sp.recordedAt DESC")
    List<StudyProgress> findByUserIdOrderByDateDesc(@Param("userId") Long userId);
}