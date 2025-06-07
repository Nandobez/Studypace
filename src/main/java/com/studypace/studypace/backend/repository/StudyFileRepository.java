package com.studypace.studypace.backend.repository;

import com.studypace.studypace.backend.model.StudyFile;
import com.studypace.studypace.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudyFileRepository extends JpaRepository<StudyFile, Long> {
    List<StudyFile> findByUser(User user);

    List<StudyFile> findByUserOrderByUploadDateTimeDesc(User user);

    @Query("SELECT sf FROM StudyFile sf WHERE sf.user.id = :userId AND sf.fileType = :fileType")
    List<StudyFile> findByUserIdAndFileType(@Param("userId") Long userId,
                                            @Param("fileType") StudyFile.FileType fileType);

    @Query("SELECT SUM(sf.fileSize) FROM StudyFile sf WHERE sf.user.id = :userId")
    Long getTotalFileSizeByUserId(@Param("userId") Long userId);

    @Query("SELECT sf FROM StudyFile sf WHERE sf.user.id = :userId AND sf.uploadDateTime BETWEEN :startDate AND :endDate")
    List<StudyFile> findByUserIdAndUploadDateTimeBetween(@Param("userId") Long userId,
                                                         @Param("startDate") LocalDateTime startDate,
                                                         @Param("endDate") LocalDateTime endDate);

    Optional<StudyFile> findByFilename(String filename);
}