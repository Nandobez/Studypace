package com.studypace.studypace.backend.controller;

import com.studypace.studypace.backend.dto.UserDTO;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.repository.UserRepository;
import com.studypace.studypace.backend.service.JwtService;
import com.studypace.studypace.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;


    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthController(UserService userService,
                          JwtService jwtService,
                          AuthenticationManager authenticationManager,
                          @Qualifier("customUserDetailsService") UserDetailsService userDetailsService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDTO dto) {
        logger.info("Registering user with email: {}", dto.getEmail());
        User user = userService.createUser(dto);
        return ResponseEntity.status(201).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            logger.info("Attempting login for email: {}", loginRequest.getEmail());

            // Verifica se o usuário existe (recupera diretamente do repositório)
            User user = userService.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            // Tenta autenticar
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(), loginRequest.getPassword()));

            logger.info("Authentication successful for user: {}", loginRequest.getEmail());

            // Gera token (opcional: use se quiser futuramente)
            // String token = jwtService.generateToken(user);

            // Remove a senha antes de retornar
            user.setPassword(null);

            // Retorna o objeto User diretamente (sem DTO)
            return ResponseEntity.ok(user);

        } catch (BadCredentialsException e) {
            logger.error("Bad credentials for user: {}", loginRequest.getEmail());
            return ResponseEntity.status(401).body("Invalid credentials");
        } catch (Exception e) {
            logger.error("Login error for user: {}", loginRequest.getEmail(), e);
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }




}