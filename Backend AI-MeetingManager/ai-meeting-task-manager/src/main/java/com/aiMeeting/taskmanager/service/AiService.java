package com.aiMeeting.taskmanager.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.aiMeeting.taskmanager.dto.MeetingResponse;
import com.aiMeeting.taskmanager.dto.MeetingResponse.ActionItem;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AiService {

    private final ObjectMapper objectMapper;
    private final RestClient restClient;

    @Value("${ai.api.key}")
    private String apiKey;

    @Value("${ai.api.url}")
    private String apiUrl;

    @Value("${ai.model}")
    private String model;

    public AiService() {

        this.objectMapper = new ObjectMapper();

        this.restClient = RestClient.builder()
                .build();
    }

    public String analyzeMeeting(
            String meetingTitle,
            String meetingText) {

        try {

            System.out.println(
                    "=========================================="
            );

            System.out.println(
                    "Starting OpenRouter FREE AI analysis..."
            );

            System.out.println(
                    "Model: " + model
            );

            System.out.println(
                    "=========================================="
            );

            String prompt = """
                    Analyze the following meeting.

                    Meeting Title:
                    %s

                    Meeting Notes:
                    %s

                    Your job is to extract:

                    1. A short summary.
                    2. Important key points.
                    3. Action items.
                    4. The person responsible for each action.
                    5. The deadline if mentioned.

                    IMPORTANT RULES:

                    - Use ONLY information present in the meeting notes.
                    - Do NOT invent people.
                    - Do NOT invent tasks.
                    - Do NOT invent deadlines.
                    - If a deadline is not mentioned, write "Not specified".
                    - Keep the summary short.
                    - Keep key points concise.
                    - Return ONLY valid JSON.
                    - Do not use markdown.
                    - Do not use ```json.
                    - Do not add explanations before or after the JSON.

                    Return exactly this structure:

                    {
                      "summary": "short meeting summary",
                      "keyPoints": [
                        "important point 1",
                        "important point 2",
                        "important point 3"
                      ],
                      "actionItems": [
                        {
                          "person": "person name",
                          "task": "task assigned to person",
                          "deadline": "deadline"
                        }
                      ]
                    }
                    """
                    .formatted(
                            meetingTitle,
                            meetingText
                    );

            Map<String, Object> requestBody =
                    Map.of(
                            "model",
                            model,

                            "messages",
                            new Object[] {

                                    Map.of(
                                            "role",
                                            "system",

                                            "content",
                                            """
                                            You are an AI Meeting Assistant.

                                            Your task is to analyze meeting notes and
                                            return accurate structured information.

                                            Never invent people, tasks or deadlines.

                                            Always return valid JSON only.
                                            """
                                    ),

                                    Map.of(
                                            "role",
                                            "user",

                                            "content",
                                            prompt
                                    )
                            },

                            "temperature",
                            0.1,

                            "max_tokens",
                            3000
                    );

            System.out.println(
                    "Sending request to OpenRouter..."
            );

            String response =
                    restClient.post()

                            .uri(apiUrl)

                            .contentType(
                                    MediaType.APPLICATION_JSON
                            )

                            .header(
                                    "Authorization",
                                    "Bearer " + apiKey
                            )

                            .header(
                                    "HTTP-Referer",
                                    "http://localhost:5173"
                            )

                            .header(
                                    "X-Title",
                                    "AI Meeting Task Manager"
                            )

                            .body(requestBody)

                            .retrieve()

                            .body(String.class);

            System.out.println(
                    "========== OPENROUTER RESPONSE =========="
            );

            System.out.println(response);

            System.out.println(
                    "=========================================="
            );

            if (response == null ||
                response.isBlank()) {

                throw new RuntimeException(
                        "OpenRouter returned an empty response."
                );
            }

            JsonNode root =
                    objectMapper.readTree(response);

            JsonNode error =
                    root.path("error");

            if (!error.isMissingNode()
                    && !error.isNull()) {

                String errorMessage =
                        error.path("message")
                                .asText();

                String errorCode =
                        error.path("code")
                                .asText();

                throw new RuntimeException(
                        "OpenRouter error "
                        + errorCode
                        + ": "
                        + errorMessage
                );
            }

            JsonNode choices =
                    root.path("choices");

            if (!choices.isArray()
                    || choices.isEmpty()) {

                throw new RuntimeException(
                        "OpenRouter returned no choices."
                );
            }

            JsonNode message =
                    choices
                            .get(0)
                            .path("message");

            JsonNode content =
                    message.path("content");

            if (content.isMissingNode()
                    || content.isNull()) {

                throw new RuntimeException(
                        "OpenRouter returned no message content."
                );
            }

            String aiContent =
                    content.asText();

            if (aiContent == null
                    || aiContent.isBlank()) {

                throw new RuntimeException(
                        "AI returned empty content."
                );
            }

            aiContent =
                    cleanJsonResponse(
                            aiContent
                    );

            System.out.println(
                    "========== CLEAN AI JSON =========="
            );

            System.out.println(aiContent);

            System.out.println(
                    "==================================="
            );

            try {

                objectMapper.readTree(
                        aiContent
                );

            } catch (Exception jsonError) {

                throw new RuntimeException(
                        "AI did not return valid JSON. Response was: "
                        + aiContent
                );
            }

            return aiContent;

        } catch (Exception e) {

            System.out.println(
                    "========== AI ERROR =========="
            );

            e.printStackTrace();

            System.out.println(
                    "=============================="
            );

            throw new RuntimeException(
                    "AI analysis failed: "
                    + e.getMessage(),
                    e
            );
        }
    }

    private String cleanJsonResponse(
            String aiContent) {

        aiContent =
                aiContent.trim();

        if (aiContent.startsWith(
                "```json")) {

            aiContent =
                    aiContent.substring(
                            7
                    );
        }

        if (aiContent.startsWith(
                "```")) {

            aiContent =
                    aiContent.substring(
                            3
                    );
        }

        if (aiContent.endsWith(
                "```")) {

            aiContent =
                    aiContent.substring(
                            0,
                            aiContent.length() - 3
                    );
        }

        aiContent =
                aiContent.trim();

        int firstBrace =
                aiContent.indexOf("{");

        int lastBrace =
                aiContent.lastIndexOf("}");

        if (firstBrace >= 0
                && lastBrace >= 0
                && lastBrace > firstBrace) {

            aiContent =
                    aiContent.substring(
                            firstBrace,
                            lastBrace + 1
                    );
        }

        return aiContent.trim();
    }

    public MeetingResponse convertToMeetingResponse(
            String aiResponse) {

        try {

            JsonNode root =
                    objectMapper.readTree(
                            aiResponse
                    );

            String summary =
                    root.path("summary")
                            .asText();

            List<String> keyPoints =
                    new ArrayList<>();

            JsonNode points =
                    root.path("keyPoints");

            if (points.isArray()) {

                for (JsonNode point : points) {

                    keyPoints.add(
                            point.asText()
                    );
                }
            }

            List<ActionItem> actionItems =
                    new ArrayList<>();

            JsonNode items =
                    root.path("actionItems");

            long id = 1;

            if (items.isArray()) {

                for (JsonNode item : items) {

                    String person =
                            item.path("person")
                                    .asText();

                    String task =
                            item.path("task")
                                    .asText();

                    String deadline =
                            item.path("deadline")
                                    .asText();

                    if (deadline == null
                            || deadline.isBlank()
                            || deadline.equals("null")) {

                        deadline =
                                "Not specified";
                    }

                    actionItems.add(
                            new ActionItem(
                                    id++,
                                    person,
                                    task,
                                    deadline
                            )
                    );
                }
            }

            return new MeetingResponse(
                    summary,
                    keyPoints,
                    actionItems
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Could not process AI response: "
                    + e.getMessage(),
                    e
            );
        }
    }
}