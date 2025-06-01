package com.studypace.studypace.backend.service;
import com.studypace.studypace.backend.config.AppProperties;
import com.studypace.studypace.backend.dto.*;
import com.studypace.studypace.backend.model.*;
import com.studypace.studypace.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AppProperties props;
    private final RestTemplate restTemplate;
    private final PasswordEncoder passwordEncoder;
    private final FeedbackServiceDecorator feedbackService = new FeedbackServiceDecorator.FormattedFeedbackDecorator(new FeedbackServiceDecorator.GeminiFeedbackDecorator());
    private final List<ProgressObserver> observers = List.of(new ProgressObserver.TeacherNotifier());

    public User createUser(UserDTO dto) {
        User user = UserFactory.createUser(dto.getRole(), dto.getName(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()), dto.isActive());
        user.setPreferences(UserPreferences.builder()
                .studyGoals("General Learning")
                .preferredSubjects("All")
                .dailyStudyHours(2)
                .build());
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> updateUser(Long id, UserDTO dto) {
        return userRepository.findById(id).map(u -> {
            u.setName(dto.getName());
            u.setEmail(dto.getEmail());
            u.setPassword(passwordEncoder.encode(dto.getPassword()));
            u.setActive(dto.isActive());
            return userRepository.save(u);
        });
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public PromptResponseDTO sendPrompt(PromptRequestDTO req) {
        String url = props.getGeminiEndpoint() + "?key=" + props.getGeminiApiKey();
        Map<String, Object> payload = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", req.getPrompt())))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        GeminiResponseDTO response = restTemplate.postForObject(url, entity, GeminiResponseDTO.class);
        if (response == null || response.getCandidates() == null || response.getCandidates().isEmpty()) {
            throw new RuntimeException("No response from Gemini API");
        }

        String result = response.getCandidates().get(0).getContent().getParts().get(0).getText();
        PromptResponseDTO out = new PromptResponseDTO();
        out.setResponse(feedbackService.generateFeedback(result));
        if (req.getEmail() != null) {
            userRepository.findByEmail(req.getEmail()).ifPresent(student ->
                    observers.forEach(observer -> observer.onProgressUpdate(student, result)));
        }
        return out;
    }

    public List<FileUploadResponseDTO> uploadFiles(Long userId, List<MultipartFile> files) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Path dir = Path.of("uploads/" + userId);
        Files.createDirectories(dir);
        long total = Files.walk(dir).filter(Files::isRegularFile).mapToLong(p -> p.toFile().length()).sum();
        List<FileUploadResponseDTO> out = new ArrayList<>();
        for (MultipartFile f : files) {
            if (total + f.getSize() > props.getMaxTotalFileBytes()) {
                throw new RuntimeException("Total file size exceeds 80MB");
            }
            Path dest = dir.resolve(f.getOriginalFilename());
            Files.copy(f.getInputStream(), dest);
            total += dest.toFile().length();
            FileUploadResponseDTO dto = new FileUploadResponseDTO();
            dto.setFilename(dest.getFileName().toString());
            dto.setSize(dest.toFile().length());
            out.add(dto);
        }
        return out;
    }

    public UserPreferences updatePreferences(Long userId, UserPreferencesDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserPreferences prefs = user.getPreferences();
        if (prefs == null) {
            prefs = new UserPreferences();
            user.setPreferences(prefs);
        }
        prefs.setStudyGoals(dto.getStudyGoals());
        prefs.setPreferredSubjects(dto.getPreferredSubjects());
        prefs.setDailyStudyHours(dto.getDailyStudyHours());
        userRepository.save(user);
        return prefs;
    }
}