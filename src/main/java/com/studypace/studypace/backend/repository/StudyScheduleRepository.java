package com.studypace.studypace.backend.repository;

import com.studypace.studypace.backend.model.StudySchedule;
import com.studypace.studypace.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StudyScheduleRepository extends JpaRepository<StudySchedule, Long> {
    List<StudySchedule> findByUser(User user);

    List<StudySchedule> findByUserOrderByCreatedAtDesc(User user);

    @Query("SELECT ss FROM StudySchedule ss WHERE ss.user.id = :userId AND ss.status = :status")
    List<StudySchedule> findByUserIdAndStatus(@Param("userId") Long userId,
                                              @Param("status") StudySchedule.ScheduleStatus status);

    @Query("SELECT ss FROM StudySchedule ss WHERE ss.user.id = :userId AND ss.endDate >= :currentDate AND ss.status = 'ACTIVE'")
    List<StudySchedule> findActiveSchedulesByUserId(@Param("userId") Long userId,
                                                    @Param("currentDate") LocalDateTime now);

    @Query("SELECT ss FROM StudySchedule ss WHERE ss.startDate <= :endDate AND ss.endDate >= :startDate AND ss.user.id = :userId")
    List<StudySchedule> findOverlappingSchedules(@Param("userId") Long userId,
                                                 @Param("startDate") LocalDateTime startDate,
                                                 @Param("endDate") LocalDateTime endDate);
}