package com.learningjourney.javacodex.task;

import jakarta.validation.constraints.NotBlank;

public class TaskRequest {
  @NotBlank(message = "title is required")
  private String title;

  private String description;
  private boolean completed;
  private int priority;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean isCompleted() {
    return completed;
  }

  public void setCompleted(boolean completed) {
    this.completed = completed;
  }

  public int getPriority() {
    return priority;
  }

  public void setPriority(int priority) {
    this.priority = priority;
  }
}
