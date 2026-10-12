package com.aiMeeting.taskmanager.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aiMeeting.taskmanager.entity.Task;
import com.aiMeeting.taskmanager.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // CREATE TASK
    @PostMapping
    public Task createTask(
            @RequestBody Task task,
            Authentication authentication) {

        String ownerEmail =
                authentication.getName();

        return taskService.createTask(
                task,
                ownerEmail
        );
    }

    // GET ALL USER TASKS
    @GetMapping
    public List<Task> getAllTasks(
            Authentication authentication) {

        String ownerEmail =
                authentication.getName();

        return taskService.getAllTasks(
                ownerEmail
        );
    }

    // SEARCH USER TASKS
    @GetMapping("/search")
    public List<Task> searchTasks(
            @RequestParam String keyword,
            Authentication authentication) {

        String ownerEmail =
                authentication.getName();

        return taskService.searchTasks(
                keyword,
                ownerEmail
        );
    }

    // GET ONE USER TASK
    @GetMapping("/{id}")
    public Optional<Task> getTaskById(
            @PathVariable Long id,
            Authentication authentication) {

        String ownerEmail =
                authentication.getName();

        return taskService.getTaskById(
                id,
                ownerEmail
        );
    }

    // UPDATE USER TASK
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task,
            Authentication authentication) {

        String ownerEmail =
                authentication.getName();

        return taskService.updateTask(
                id,
                task,
                ownerEmail
        );
    }

    // DELETE USER TASK
    @DeleteMapping("/{id}")
    public String deleteTask(
            @PathVariable Long id,
            Authentication authentication) {

        String ownerEmail =
                authentication.getName();

        return taskService.deleteTask(
                id,
                ownerEmail
        );
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public Task updateTaskStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> data,
            Authentication authentication) {

        String status =
                data.get("status");

        String ownerEmail =
                authentication.getName();

        return taskService.updateTaskStatus(
                id,
                status,
                ownerEmail
        );
    }
}