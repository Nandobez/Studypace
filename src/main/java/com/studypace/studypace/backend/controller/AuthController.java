package com.studypace.studypace.backend.controller;

import com.studypace.studypace.backend.dto.UserDTO;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.service.JwtService;
import com.studypace.studypace.backend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

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

            // Verifica se o usuário existe
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            logger.info("User found: {}, enabled: {}", userDetails.getUsername(), userDetails.isEnabled());

            // Tenta autenticar
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(), loginRequest.getPassword()));

            logger.info("Authentication successful for user: {}", loginRequest.getEmail());

            String token = jwtService.generateToken(userDetails);
            return ResponseEntity.ok(new HashMap<String, Object>() {{
                put("token", token);
            }});

        } catch (BadCredentialsException e) {
            logger.error("Bad credentials for user: {}", loginRequest.getEmail());
            return ResponseEntity.status(401).body("Invalid credentials");
        } catch (Exception e) {
            logger.error("Login error for user: {}", loginRequest.getEmail(), e);
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }
}