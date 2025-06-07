package com.studypace.studypace.backend.repository;

import com.studypace.studypace.backend.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByEmail(String email);

    List<Teacher> findByActiveTrue();

    @Query("SELECT t FROM Teacher t WHERE t.specialization LIKE %:specialization% AND t.active = true")
    List<Teacher> findBySpecializationContainingAndActiveTrue(@Param("specialization") String specialization);

    @Query("SELECT COUNT(str) FROM StudentTeacherRelation str WHERE str.teacher.id = :teacherId AND str.status = 'ACCEPTED'")
    long countStudentsByTeacherId(@Param("teacherId") Long teacherId);
}