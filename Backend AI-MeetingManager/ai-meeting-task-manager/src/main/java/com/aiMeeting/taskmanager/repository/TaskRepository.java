package com.aiMeeting.taskmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aiMeeting.taskmanager.entity.Task;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

    List<Task> findByTitleContainingIgnoreCase(String keyword);

    List<Task> findByOwnerEmail(String ownerEmail);

    List<Task> findByOwnerEmailAndTitleContainingIgnoreCase(
            String ownerEmail,
            String keyword
    );
}