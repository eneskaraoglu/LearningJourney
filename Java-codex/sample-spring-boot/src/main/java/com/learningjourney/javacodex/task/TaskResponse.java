package com.learningjourney.javacodex.task;

import java.time.Instant;

public class TaskResponse {
  private Long id;
  private String title;
  private String description;
  private boolean completed;
  private int priority;
  private Instant createdAt;

  public TaskResponse(Long id, String title, String description, boolean completed, int priority, Instant createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.priority = priority;
    this.createdAt = createdAt;
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public boolean isCompleted() {
    return completed;
  }

  public int getPriority() {
    return priority;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }
}
