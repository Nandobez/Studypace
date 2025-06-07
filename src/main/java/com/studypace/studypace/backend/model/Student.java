package com.studypace.studypace.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("STUDENT")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Student extends User {

    private String studyLevel;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentTeacherRelation> studentRelations = new ArrayList<>();

    public Student(Long id, String name, String email, String password, Role role, boolean active, UserPreferences preferences, String studyLevel) {
        super(id, name, email, password, role, active, preferences);
        this.studyLevel = studyLevel;
    }

    // Adicionar helpers para manter a consistência da relação (opcional)
    public void addRelation(StudentTeacherRelation relation) {
        studentRelations.add(relation);
        relation.setStudent(this);
    }

    public void removeRelation(StudentTeacherRelation relation) {
        studentRelations.remove(relation);
        relation.setStudent(null);
    }
}
