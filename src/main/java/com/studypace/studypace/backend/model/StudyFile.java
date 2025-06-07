package com.studypace.studypace.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "study_file")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String filename;

    @Column(nullable = false)
    private String originalFilename;

    @Column(nullable = false)
    private String contentType;

    @Column(nullable = false)
    private Long fileSize;

    @Column(nullable = false, length = 500)
    private String filePath;

    @Lob
    private byte[] fileContent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private LocalDateTime uploadDateTime;

    private String description;

    @Enumerated(EnumType.STRING)
    private FileType fileType;

    @PrePersist
    protected void onCreate() {
        uploadDateTime = LocalDateTime.now();
    }

    public enum FileType {
        PDF, DOC, DOCX, TXT, IMAGE, AUDIO, VIDEO, OTHER
    }
}