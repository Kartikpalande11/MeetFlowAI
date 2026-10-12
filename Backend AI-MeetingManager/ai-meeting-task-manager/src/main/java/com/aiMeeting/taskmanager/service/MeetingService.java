package com.aiMeeting.taskmanager.service;

import org.springframework.stereotype.Service;

import com.aiMeeting.taskmanager.dto.MeetingRequest;
import com.aiMeeting.taskmanager.dto.MeetingResponse;

@Service
public class MeetingService {

    private final AiService aiService;

    public MeetingService(AiService aiService) {
        this.aiService = aiService;
    }

    public MeetingResponse analyzeMeeting(
            MeetingRequest request) {

        String aiResponse =
                aiService.analyzeMeeting(
                        request.getTitle(),
                        request.getNotes()
                );

        return aiService.convertToMeetingResponse(
                aiResponse
        );
    }
}