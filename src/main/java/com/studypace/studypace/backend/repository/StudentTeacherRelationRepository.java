package com.studypace.studypace.backend.repository;

import com.studypace.studypace.backend.model.StudentTeacherRelation;
import com.studypace.studypace.backend.model.Student;
import com.studypace.studypace.backend.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentTeacherRelationRepository extends JpaRepository<StudentTeacherRelation, Long> {
    List<StudentTeacherRelation> findByStudent(Student student);

    List<StudentTeacherRelation> findByTeacher(Teacher teacher);

    @Query("SELECT str FROM StudentTeacherRelation str WHERE str.student.id = :studentId AND str.status = :status")
    List<StudentTeacherRelation> findByStudentIdAndStatus(@Param("studentId") Long studentId,
                                                          @Param("status") StudentTeacherRelation.RelationStatus status);

    @Query("SELECT str FROM StudentTeacherRelation str WHERE str.teacher.id = :teacherId AND str.status = :status")
    List<StudentTeacherRelation> findByTeacherIdAndStatus(@Param("teacherId") Long teacherId,
                                                          @Param("status") StudentTeacherRelation.RelationStatus status);

    Optional<StudentTeacherRelation> findByStudentAndTeacher(Student student, Teacher teacher);

    boolean existsByStudentAndTeacherAndStatus(Student student, Teacher teacher, StudentTeacherRelation.RelationStatus status);
}