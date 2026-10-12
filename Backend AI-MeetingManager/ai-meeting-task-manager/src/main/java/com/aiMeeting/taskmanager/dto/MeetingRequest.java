package com.aiMeeting.taskmanager.dto;

public class MeetingRequest {

    private String title;
    private String notes;

    public MeetingRequest() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}