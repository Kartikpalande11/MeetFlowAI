package com.aiMeeting.taskmanager.dto;

import java.util.List;

public class MeetingResponse {

    private String summary;

    private List<String> keyPoints;

    private List<ActionItem> actionItems;

    public MeetingResponse() {
    }

    public MeetingResponse(
            String summary,
            List<String> keyPoints,
            List<ActionItem> actionItems) {

        this.summary = summary;
        this.keyPoints = keyPoints;
        this.actionItems = actionItems;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getKeyPoints() {
        return keyPoints;
    }

    public void setKeyPoints(List<String> keyPoints) {
        this.keyPoints = keyPoints;
    }

    public List<ActionItem> getActionItems() {
        return actionItems;
    }

    public void setActionItems(List<ActionItem> actionItems) {
        this.actionItems = actionItems;
    }

    public static class ActionItem {

        private Long id;
        private String person;
        private String task;
        private String deadline;

        public ActionItem() {
        }

        public ActionItem(
                Long id,
                String person,
                String task,
                String deadline) {

            this.id = id;
            this.person = person;
            this.task = task;
            this.deadline = deadline;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getPerson() {
            return person;
        }

        public void setPerson(String person) {
            this.person = person;
        }

        public String getTask() {
            return task;
        }

        public void setTask(String task) {
            this.task = task;
        }

        public String getDeadline() {
            return deadline;
        }

        public void setDeadline(String deadline) {
            this.deadline = deadline;
        }
    }
}