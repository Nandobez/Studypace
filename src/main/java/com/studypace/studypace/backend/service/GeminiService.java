//package com.studypace.studypace.backend.service;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.studypace.studypace.backend.config.AppProperties;
//import com.studypace.studypace.backend.config.GeminiApiClient;
//import com.studypace.studypace.backend.dto.GeminiRequestDTO;
//import com.studypace.studypace.backend.dto.GeminiResponseDTO;
//import com.studypace.studypace.backend.dto.StudyFeedbackRequestDTO;
//import com.studypace.studypace.backend.dto.StudyScheduleRequestDTO;
//import com.studypace.studypace.backend.model.StudyFile;
//import com.studypace.studypace.backend.model.StudyProgress;
//import com.studypace.studypace.backend.model.User;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//
//@Service
//@Slf4j
//@RequiredArgsConstructor
//public class GeminiService {
//
//    private final AppProperties appProperties;
//    private final GeminiApiClient geminiApiClient;
//    private final FileProcessingService fileProcessingService;
//    private final FeedbackServiceDecorator feedbackService = new FeedbackServiceDecorator.FormattedFeedbackDecorator(
//            new FeedbackServiceDecorator.GeminiFeedbackDecorator());
//
//    private final ObjectMapper objectMapper = new ObjectMapper();
//    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//    public String generateStudySchedule(User user, StudyScheduleRequestDTO request, List<StudyFile> userFiles) {
//        try {
//            String prompt = buildStudySchedulePrompt(user, request, userFiles);
//            GeminiRequestDTO geminiRequest = createGeminiRequest(prompt);
//            String response = callGeminiAPI(geminiRequest);
//            return feedbackService.generateFeedback(response);
//        } catch (Exception e) {
//            log.error("Error generating study schedule with Gemini: ", e);
//            return generateFallbackSchedule(request);
//        }
//    }
//
//    public String generateStudyFeedback(User user, StudyFeedbackRequestDTO request, List<StudyProgress> progressList) {
//        try {
//            String prompt = buildFeedbackPrompt(user, request, progressList);
//            GeminiRequestDTO geminiRequest = createGeminiRequest(prompt);
//            String response = callGeminiAPI(geminiRequest);
//            return feedbackService.generateFeedback(response);
//        } catch (Exception e) {
//            log.error("Error generating study feedback with Gemini: ", e);
//            return generateFallbackFeedback(request, progressList);
//        }
//    }
//
//    private String buildStudySchedulePrompt(User user, StudyScheduleRequestDTO request, List<StudyFile> userFiles) {
//        StringBuilder prompt = new StringBuilder();
//        prompt.append("Você é um assistente educacional especializado em criar cronogramas de estudo personalizados. ");
//        prompt.append("Crie um cronograma detalhado em JSON para o usuário.\n\n");
//
//        prompt.append("INFORMAÇÕES DO USUÁRIO:\n");
//        prompt.append("- Nome: ").append(user.getName()).append("\n");
//        prompt.append("- Tipo de estudo: ").append(request.getStudyType()).append("\n");
//        prompt.append("- Horas diárias: ").append(request.getDailyHours()).append("\n");
//        prompt.append("- Finalidade: ").append(request.getPurpose()).append("\n");
//        prompt.append("- Métodos preferidos: ").append(request.getPreferredMethods()).append("\n");
//        prompt.append("- Início: ").append(request.getStartDate().format(dateFormatter)).append("\n");
//        prompt.append("- Fim: ").append(request.getDateEndDate().format(dateFormatter)).append("\n");
//
//        if (request.getSubjects() != null && !request.getSubjects().isEmpty()) {
//            prompt.append("- Matérias: ").append(String.join(", ", request.getSubjects())).append("\n");
//        }
//
//        if (!userFiles.isEmpty()) {
//            prompt.append("\nARQUIVOS DO USUÁRIO:\n");
//            for (StudyFile file : userFiles) {
//                String content = fileProcessingService.extractTextContent(file);
//                prompt.append("- ").append(file.getOriginalFilename()).append(": ");
//                prompt.append(content.length() > 500 ? content.substring(0, 500) + "..." : content);
//                prompt.append("\n");
//            }
//        }
//
//        prompt.append("\nRETORNE APENAS UM JSON:\n");
//        prompt.append("{\n  \"schedule\": [\n    {\n      \"date\": \"yyyy-MM-dd\",\n      \"subjects\": [\n");
//        prompt.append("        {\"name\": \"string\", \"topics\": [\"string\"], \"timeSlots\": \"HH:MM-HH:MM\", \"priority\": \"LOW|MEDIUM|HIGH\"}\n");
//        prompt.append("      ]\n    }\n  ],\n  \"importantSubjects\": [\"string\"],\n  \"recommendations\": \"string\"\n}\n");
//
//        return prompt.toString();
//    }
//
//    private String buildFeedbackPrompt(User user, StudyFeedbackRequestDTO request, List<StudyProgress> progressList) {
//        StringBuilder prompt = new StringBuilder();
//        prompt.append("Você é um assistente educacional especializado em fornecer feedback personalizado. ");
//        prompt.append("Calcule a porcentagem de absorção e forneça feedback em JSON.\n\n");
//
//        prompt.append("DADOS DO ALUNO:\n");
//        prompt.append("- Nome: ").append(user.getName()).append("\n");
//        prompt.append("- Período: ").append(request.getStartDate().format(dateFormatter)).append(" a ").append(request.getEndDate().format(dateFormatter)).append("\n");
//        prompt.append("- Matéria: ").append(request.getSubject()).append("\n");
//
//        if (!progressList.isEmpty()) {
//            prompt.append("\nPROGRESSO:\n");
//            for (StudyProgress progress : progressList) {
//                prompt.append("- Data: ").append(progress.getStudyDate().format(dateFormatter)).append(", Horas: ").append(progress.getStudiedHours());
//                prompt.append(", Compreensão: ").append(progress.getComprehensionPercentage()).append("%\n");
//            }
//        }
//
//        prompt.append("\nRETORNE APENAS UM JSON:\n");
//        prompt.append("{\n  \"subject\": \"string\", \"absorptionPercentage\": number,\n");
//        prompt.append("  \"feedback\": \"string\", \"recommendations\": \"string\"\n}\n");
//
//        return prompt.toString();
//    }
//
//    private GeminiRequestDTO createGeminiRequest(String prompt) {
//        return GeminiRequestDTO.builder()
//                .contents(List.of(
//                        GeminiRequestDTO.Content.builder()
//                                .parts(List.of(
//                                        GeminiRequestDTO.Part.builder()
//                                                .text(prompt)
//                                                .build()))
//                                .build()))
//                .build();
//    }
//
//    private String callGeminiAPI(GeminiRequestDTO request) {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("x-goog-api-key", appProperties.getGeminiApiKey());
//
//        HttpEntity<GeminiRequestDTO> entity = new HttpEntity<>(request, headers);
//        ResponseEntity<GeminiResponseDTO> response = geminiApiClient.getRestTemplate()
//                .exchange(appProperties.getGeminiEndpoint(), HttpMethod.POST, entity, GeminiResponseDTO.class);
//
//        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
//            GeminiResponseDTO body = response.getBody();
//            if (body.getCandidates() != null && !body.getCandidates().isEmpty() &&
//                    body.getCandidates().get(0).getContent() != null &&
//                    body.getCandidates().get(0).getContent().getParts() != null &&
//                    !body.getCandidates().get(0).getContent().getParts().isEmpty()) {
//                return body.getCandidates().get(0).getContent().getParts().get(0).getText();
//            }
//        }
//        throw new IllegalStateException("Failed to call Gemini API: invalid response structure");
//    }
//
//    private String generateFallbackFeedback(StudyFeedbackRequestDTO request, List<StudyProgress> progressList) {
//        double absorption = progressList.stream()
//                .mapToDouble(StudyProgress::getComprehensionPercentage)
//                .average()
//                .orElse(0.0);
//
//        return String.format("""
//                {
//                    "subject": "%s",
//                    "absorptionPercentage": %.2f,
//                    "feedback": "Review your study materials due to API failure",
//                    "recommendations": "Focus on revising key topics"
//                }
//                """,
//                request.getSubject(),
//                absorption);
//    }
//
//    private String generateFallbackSchedule(StudyScheduleRequestDTO request) {
//        String subjects = request.getSubjects() != null && !request.getSubjects().isEmpty()
//                ? String.join(", ", request.getSubjects())
//                : "General Studies";
//        return String.format("""
//                {
//                    "schedule": [
//                        {
//                            "date": "%s",
//                            "subjects": [
//                                {
//                                    "name": "%s",
//                                    "topics": ["Basic Concepts"],
//                                    "timeSlots": "09:00-11:00",
//                                    "priority": "MEDIUM"
//                                }
//                            ]
//                        }
//                    ],
//                    "importantSubjects": ["%s"],
//                    "recommendations": "Follow the schedule and review materials due to API failure"
//                }
//                """,
//                request.getStartDate().format(dateFormatter),
//                subjects,
//                subjects);
//    }
//}



package com.studypace.studypace.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.studypace.studypace.backend.config.AppProperties;
import com.studypace.studypace.backend.config.GeminiApiClient;
import com.studypace.studypace.backend.dto.GeminiRequestDTO;
import com.studypace.studypace.backend.dto.GeminiResponseDTO;
import com.studypace.studypace.backend.dto.StudyFeedbackRequestDTO;
import com.studypace.studypace.backend.dto.StudyScheduleRequestDTO;
import com.studypace.studypace.backend.model.StudyFile;
import com.studypace.studypace.backend.model.StudyProgress;
import com.studypace.studypace.backend.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException; // Importar RestClientException

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class GeminiService {

    private final AppProperties appProperties;
    private final GeminiApiClient geminiApiClient;
    private final FileProcessingService fileProcessingService;
    private final FeedbackServiceDecorator feedbackService = new FeedbackServiceDecorator.FormattedFeedbackDecorator(
            new FeedbackServiceDecorator.GeminiFeedbackDecorator());

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public String generateStudySchedule(User user, StudyScheduleRequestDTO request, List<StudyFile> userFiles) {
        try {
            String prompt = buildStudySchedulePrompt(user, request, userFiles);
            GeminiRequestDTO geminiRequest = createGeminiRequest(prompt);
            String response = callGeminiAPI(geminiRequest);
            return feedbackService.generateFeedback(response);
        } catch (Exception e) {
            // Logar a exceção completa para entender o problema
            log.error("Error generating study schedule with Gemini: {}", e.getMessage(), e);
            return generateFallbackSchedule(request);
        }
    }

    public String generateStudyFeedback(User user, StudyFeedbackRequestDTO request, List<StudyProgress> progressList) {
        try {
            String prompt = buildFeedbackPrompt(user, request, progressList);
            GeminiRequestDTO geminiRequest = createGeminiRequest(prompt);
            String response = callGeminiAPI(geminiRequest);
            return feedbackService.generateFeedback(response);
        } catch (Exception e) {
            // Logar a exceção completa para entender o problema
            log.error("Error generating study feedback with Gemini: {}", e.getMessage(), e);
            return generateFallbackFeedback(request, progressList);
        }
    }

    private String buildStudySchedulePrompt(User user, StudyScheduleRequestDTO request, List<StudyFile> userFiles) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Você é um assistente educacional especializado em criar cronogramas de estudo personalizados. ");
        prompt.append("Crie um cronograma detalhado em JSON para o usuário.\n\n");

        prompt.append("INFORMAÇÕES DO USUÁRIO:\n");
        prompt.append("- Nome: ").append(user.getName()).append("\n");
        prompt.append("- Tipo de estudo: ").append(request.getStudyType()).append("\n");
        prompt.append("- Horas diárias: ").append(request.getDailyHours()).append("\n");
        prompt.append("- Finalidade: ").append(request.getPurpose()).append("\n");
        prompt.append("- Métodos preferidos: ").append(request.getPreferredMethods()).append("\n");
        prompt.append("- Início: ").append(request.getStartDate().format(dateFormatter)).append("\n");
        prompt.append("- Fim: ").append(request.getDateEndDate().format(dateFormatter)).append("\n");

        if (request.getSubjects() != null && !request.getSubjects().isEmpty()) {
            prompt.append("- Matérias: ").append(String.join(", ", request.getSubjects())).append("\n");
        }

        if (!userFiles.isEmpty()) {
            prompt.append("\nARQUIVOS DO USUÁRIO:\n");
            for (StudyFile file : userFiles) {
                String content = fileProcessingService.extractTextContent(file);
                prompt.append("- ").append(file.getOriginalFilename()).append(": ");
                prompt.append(content.length() > 500 ? content.substring(0, 500) + "..." : content);
                prompt.append("\n");
            }
        }

        prompt.append("\nRETORNE APENAS UM JSON:\n");
        prompt.append("{\n  \"schedule\": [\n    {\n      \"date\": \"yyyy-MM-dd\",\n      \"subjects\": [\n");
        prompt.append("        {\"name\": \"string\", \"topics\": [\"string\"], \"timeSlots\": \"HH:MM-HH:MM\", \"priority\": \"LOW|MEDIUM|HIGH\"}\n");
        prompt.append("      ]\n    }\n  ],\n  \"importantSubjects\": [\"string\"],\n  \"recommendations\": \"string\"\n}\n");

        return prompt.toString();
    }

    private String buildFeedbackPrompt(User user, StudyFeedbackRequestDTO request, List<StudyProgress> progressList) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Você é um assistente educacional especializado em fornecer feedback personalizado. ");
        prompt.append("Calcule a porcentagem de absorção e forneça feedback em JSON.\n\n");

        prompt.append("DADOS DO ALUNO:\n");
        prompt.append("- Nome: ").append(user.getName()).append("\n");
        prompt.append("- Período: ").append(request.getStartDate().format(dateFormatter)).append(" a ").append(request.getEndDate().format(dateFormatter)).append("\n");
        prompt.append("- Matéria: ").append(request.getSubject()).append("\n");

        if (!progressList.isEmpty()) {
            prompt.append("\nPROGRESSO:\n");
            for (StudyProgress progress : progressList) {
                prompt.append("- Data: ").append(progress.getStudyDate().format(dateFormatter)).append(", Horas: ").append(progress.getStudiedHours());
                prompt.append(", Compreensão: ").append(progress.getComprehensionPercentage()).append("%\n");
            }
        }

        prompt.append("\nRETORNE APENAS UM JSON:\n");
        prompt.append("{\n  \"subject\": \"string\", \"absorptionPercentage\": number,\n");
        prompt.append("  \"feedback\": \"string\", \"recommendations\": \"string\"\n}\n");

        return prompt.toString();
    }

    private GeminiRequestDTO createGeminiRequest(String prompt) {
        return GeminiRequestDTO.builder()
                .contents(List.of(
                        GeminiRequestDTO.Content.builder()
                                .parts(List.of(
                                        GeminiRequestDTO.Part.builder()
                                                .text(prompt)
                                                .build()))
                                .build()))
                .build();
    }

    private String callGeminiAPI(GeminiRequestDTO request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", appProperties.getGeminiApiKey());

        HttpEntity<GeminiRequestDTO> entity = new HttpEntity<>(request, headers);
        ResponseEntity<GeminiResponseDTO> response = null;
        try {
            response = geminiApiClient.getRestTemplate()
                    .exchange(appProperties.getGeminiEndpoint(), HttpMethod.POST, entity, GeminiResponseDTO.class);
        } catch (RestClientException e) {
            // Captura exceções de comunicação com a API (ex: timeout, host desconhecido, 4xx/5xx status codes)
            log.error("Erro na comunicação com a Gemini API: {}", e.getMessage(), e);
            throw new IllegalStateException("Falha na comunicação com a Gemini API.", e);
        }

        if (response != null && response.getStatusCode().is2xxSuccessful()) {
            GeminiResponseDTO body = response.getBody();
            if (body != null) {
                // Logar o corpo completo da resposta da API do Gemini para depuração
                log.debug("Resposta bruta da Gemini API: {}", body);

                if (body.getCandidates() != null && !body.getCandidates().isEmpty() &&
                        body.getCandidates().get(0).getContent() != null &&
                        body.getCandidates().get(0).getContent().getParts() != null &&
                        !body.getCandidates().get(0).getContent().getParts().isEmpty()) {
                    return body.getCandidates().get(0).getContent().getParts().get(0).getText();
                } else {
                    log.warn("Estrutura da resposta da Gemini API inesperada ou conteúdo vazio: {}", body);
                    throw new IllegalStateException("Falha ao chamar a Gemini API: estrutura de resposta inválida ou conteúdo vazio.");
                }
            } else {
                log.error("Corpo da resposta da Gemini API é nulo, apesar do status 2xx.");
                throw new IllegalStateException("Falha ao chamar a Gemini API: corpo da resposta vazio.");
            }
        } else {
            // Logar status code e corpo da resposta para depuração em caso de falha
            String errorBody = (response != null && response.hasBody()) ? response.getBody().toString() : "N/A";
            int statusCode = (response != null) ? response.getStatusCode().value() : -1;
            log.error("Chamada para a Gemini API falhou com status: {} e corpo: {}", statusCode, errorBody);
            throw new IllegalStateException("Falha ao chamar a Gemini API: código de status não bem-sucedido ou corpo vazio.");
        }
    }

    private String generateFallbackFeedback(StudyFeedbackRequestDTO request, List<StudyProgress> progressList) {
        double absorption = progressList.stream()
                .mapToDouble(StudyProgress::getComprehensionPercentage)
                .average()
                .orElse(0.0);

        return String.format("""
                {
                    "subject": "%s",
                    "absorptionPercentage": %.2f,
                    "feedback": "Review your study materials due to API failure",
                    "recommendations": "Focus on revising key topics"
                }
                """,
                request.getSubject(),
                absorption);
    }

    private String generateFallbackSchedule(StudyScheduleRequestDTO request) {
        String subjects = request.getSubjects() != null && !request.getSubjects().isEmpty()
                ? String.join(", ", request.getSubjects())
                : "General Studies";
        return String.format("""
                {
                    "schedule": [
                        {
                            "date": "%s",
                            "subjects": [
                                {
                                    "name": "%s",
                                    "topics": ["Basic Concepts"],
                                    "timeSlots": "09:00-11:00",
                                    "priority": "MEDIUM"
                                }
                            ]
                        }
                    ],
                    "importantSubjects": ["%s"],
                    "recommendations": "Follow the schedule and review materials due to API failure"
                }
                """,
                request.getStartDate().format(dateFormatter),
                subjects,
                subjects);
    }
}
