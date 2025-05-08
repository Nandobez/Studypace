package com.studypace.studypace.backend.service;

import com.studypace.studypace.backend.config.AppProperties;
import com.studypace.studypace.backend.dto.*;
import com.studypace.studypace.backend.model.User;
import com.studypace.studypace.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final AppProperties props;
    private final RestTemplate restTemplate = new RestTemplate();

    /** Cria um novo usuário */
    public User createUser(UserDTO dto) {
        User u = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .role(dto.getRole())
                .active(dto.isActive())
                .build();
        return userRepository.save(u);
    }

    /** Busca usuário por ID */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /** Atualiza usuário existente */
    public Optional<User> updateUser(Long id, UserDTO dto) {
        return userRepository.findById(id).map(u -> {
            u.setName(dto.getName());
            u.setEmail(dto.getEmail());
            u.setPassword(dto.getPassword());
            u.setRole(dto.getRole());
            u.setActive(dto.isActive());
            return userRepository.save(u);
        });
    }

    /** Deleta usuário */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    /** Envia prompt para a API Gemini e retorna a resposta */
    public PromptResponseDTO sendPrompt(PromptRequestDTO req) {
        // Verifica usuário
        User u = userRepository.findByEmail(req.getEmail())
                .filter(x -> x.getPassword().equals(req.getPassword()))
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        // Monta URL com a chave da API Gemini
        String url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + props.getGeminiApiKey();

        // Payload no formato exigido pela API
        Map<String, Object> payload = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", req.getPrompt())))
                )
        );

        try {
            // Define cabeçalhos e corpo da requisição
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

            // Faz POST para a API Gemini
            Map<String, Object> response = restTemplate.postForObject(url, entity, Map.class);

            // Extrai a resposta de forma segura
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                throw new RuntimeException("Nenhuma resposta retornada pela API Gemini");
            }

            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            if (content == null) {
                throw new RuntimeException("Conteúdo da resposta está vazio");
            }

            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
            if (parts == null || parts.isEmpty()) {
                throw new RuntimeException("Partes da resposta estão vazias");
            }

            String result = (String) parts.get(0).get("text");

            // Monta DTO de resposta
            PromptResponseDTO out = new PromptResponseDTO();
            out.setResponse(result);
            return out;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao chamar API Gemini: " + e.getMessage(), e);
        }
    }


    /** Faz upload de arquivos (até 80 MB totais) */
    public List<FileUploadResponseDTO> uploadFiles(Long userId, List<MultipartFile> files) throws Exception {
        User u = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        File dir = new File("uploads/" + userId);
        dir.mkdirs();
        long total = Files.walk(dir.toPath())
                .filter(Files::isRegularFile)
                .mapToLong(p -> p.toFile().length())
                .sum();
        List<FileUploadResponseDTO> out = new ArrayList<>();
        for (MultipartFile f : files) {
            if (total + f.getSize() > props.getMaxTotalFileBytes()) {
                throw new RuntimeException("Total de arquivos excede 80MB");
            }
            File dest = new File(dir, f.getOriginalFilename());
            try (FileOutputStream fos = new FileOutputStream(dest)) {
                StreamUtils.copy(f.getInputStream(), fos);
            }
            total += dest.length();
            FileUploadResponseDTO dto = new FileUploadResponseDTO();
            dto.setFilename(dest.getName());
            dto.setSize(dest.length());
            out.add(dto);
        }
        return out;
    }
}
