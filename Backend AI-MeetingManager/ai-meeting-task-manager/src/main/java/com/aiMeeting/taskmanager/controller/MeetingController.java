package com.aiMeeting.taskmanager.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aiMeeting.taskmanager.dto.MeetingRequest;
import com.aiMeeting.taskmanager.dto.MeetingResponse;
import com.aiMeeting.taskmanager.service.MeetingService;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(
            MeetingService meetingService) {

        this.meetingService = meetingService;
    }

    @PostMapping("/analyze")
    public MeetingResponse analyzeMeeting(
            @RequestBody MeetingRequest request) {

        return meetingService.analyzeMeeting(request);
    }
}