package com.studypace.studypace.backend.model;

import com.studypace.studypace.backend.service.ProgressObserver;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("TEACHER")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Teacher extends User implements ProgressObserver {

    private String specialization;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentTeacherRelation> studentRelations = new ArrayList<>();

    public Teacher(Long id, String name, String email, String password, Role role, boolean active, UserPreferences preferences, String specialization) {
        super(id, name, email, password, role, active, preferences);
        this.specialization = specialization;
    }

    @Override
    public void onProgressUpdate(User student, String progress) {
        System.out.println("Teacher " + getName() + " notified: Student " + student.getName() + " progress: " + progress);
    }

    public void addRelation(StudentTeacherRelation relation) {
        studentRelations.add(relation);
        relation.setTeacher(this);
    }

    public void removeRelation(StudentTeacherRelation relation) {
        studentRelations.remove(relation);
        relation.setTeacher(null);
    }
}
