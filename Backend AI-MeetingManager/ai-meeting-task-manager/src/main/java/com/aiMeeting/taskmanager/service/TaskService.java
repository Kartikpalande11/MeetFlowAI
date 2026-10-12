package com.aiMeeting.taskmanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.aiMeeting.taskmanager.entity.Task;
import com.aiMeeting.taskmanager.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // CREATE TASK
    public Task createTask(
            Task task,
            String ownerEmail) {

        task.setOwnerEmail(ownerEmail);

        return taskRepository.save(task);
    }

    // GET ONLY LOGGED-IN USER'S TASKS
    public List<Task> getAllTasks(
            String ownerEmail) {

        return taskRepository.findByOwnerEmail(ownerEmail);
    }

    // GET ONE TASK ONLY IF IT BELONGS TO USER
    public Optional<Task> getTaskById(
            Long id,
            String ownerEmail) {

        return taskRepository
                .findById(id)
                .filter(task ->
                        ownerEmail.equals(task.getOwnerEmail())
                );
    }

    // UPDATE ONLY USER'S TASK
    public Task updateTask(
            Long id,
            Task updatedTask,
            String ownerEmail) {

        Task existingTask =
                taskRepository
                        .findById(id)
                        .filter(task ->
                                ownerEmail.equals(
                                        task.getOwnerEmail()
                                )
                        )
                        .orElse(null);

        if (existingTask == null) {
            return null;
        }

        existingTask.setTitle(
                updatedTask.getTitle()
        );

        existingTask.setDescription(
                updatedTask.getDescription()
        );

        existingTask.setPriority(
                updatedTask.getPriority()
        );

        existingTask.setStatus(
                updatedTask.getStatus()
        );

        existingTask.setAssignedTo(
                updatedTask.getAssignedTo()
        );

        existingTask.setDueDate(
                updatedTask.getDueDate()
        );

        return taskRepository.save(existingTask);
    }

    // DELETE ONLY USER'S TASK
    public String deleteTask(
            Long id,
            String ownerEmail) {

        Task task =
                taskRepository
                        .findById(id)
                        .filter(existingTask ->
                                ownerEmail.equals(
                                        existingTask.getOwnerEmail()
                                )
                        )
                        .orElse(null);

        if (task == null) {
            return "Task not found";
        }

        taskRepository.delete(task);

        return "Task deleted successfully";
    }

    // UPDATE STATUS ONLY FOR USER'S TASK
    public Task updateTaskStatus(
            Long id,
            String status,
            String ownerEmail) {

        Task task =
                taskRepository
                        .findById(id)
                        .filter(existingTask ->
                                ownerEmail.equals(
                                        existingTask.getOwnerEmail()
                                )
                        )
                        .orElse(null);

        if (task == null) {
            return null;
        }

        task.setStatus(status);

        return taskRepository.save(task);
    }

    // SEARCH ONLY USER'S TASKS
    public List<Task> searchTasks(
            String keyword,
            String ownerEmail) {

        return taskRepository
                .findByOwnerEmailAndTitleContainingIgnoreCase(
                        ownerEmail,
                        keyword
                );
    }
}