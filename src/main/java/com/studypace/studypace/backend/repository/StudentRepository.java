package com.studypace.studypace.backend.repository;

import com.studypace.studypace.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);

    List<Student> findByActiveTrue();

    @Query("SELECT s FROM Student s WHERE s.studyLevel = :studyLevel AND s.active = true")
    List<Student> findByStudyLevelAndActiveTrue(@Param("studyLevel") String studyLevel);

    @Query("SELECT s FROM Student s JOIN s.studentRelations str WHERE str.teacher.id = :teacherId AND str.status = 'ACCEPTED'")
    List<Student> findStudentsByTeacherId(@Param("teacherId") Long teacherId);
}