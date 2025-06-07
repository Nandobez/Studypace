package com.studypace.studypace.backend.repository;

import com.studypace.studypace.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findByActiveTrue();

    @Query("SELECT u FROM User u WHERE u.role = :role AND u.active = true")
    List<User> findActiveUsersByRole(@Param("role") User.Role role);

    @Query("SELECT COUNT(*) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") User.Role role);

    boolean existsByEmail(String email);
}