package com.studypace.studypace.backend.repository;

import com.studypace.studypace.backend.model.UserPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserPreferencesRepository extends JpaRepository<UserPreferences, Long> {

    @Query("SELECT p FROM UserPreferences p WHERE p.user.id = :userId")
    Optional<UserPreferences> findByUserId(@Param("userId") Long userId);

    @Query("SELECT p FROM UserPreferences p WHERE p.user.email = :email")
    Optional<UserPreferences> findByUserEmail(@Param("email") String email);
}