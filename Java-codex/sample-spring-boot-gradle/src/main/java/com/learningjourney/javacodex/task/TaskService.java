package com.learningjourney.javacodex.task;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TaskService {
  private final TaskRepository repository;

  public TaskService(TaskRepository repository) {
    this.repository = repository;
  }

  @Transactional
  public TaskResponse create(TaskRequest request) {
    Task task = new Task();
    apply(task, request);
    Task saved = repository.save(task);
    return toResponse(saved);
  }

  @Transactional(readOnly = true)
  public List<TaskResponse> list(Optional<Boolean> completed) {
    List<Task> tasks = completed
        .map(repository::findByCompleted)
        .orElseGet(repository::findAll);
    return tasks.stream().map(this::toResponse).toList();
  }

  @Transactional(readOnly = true)
  public TaskResponse get(Long id) {
    Task task = repository.findById(id)
        .orElseThrow(() -> new NotFoundException("Task not found: " + id));
    return toResponse(task);
  }

  @Transactional
  public TaskResponse update(Long id, TaskRequest request) {
    Task task = repository.findById(id)
        .orElseThrow(() -> new NotFoundException("Task not found: " + id));
    apply(task, request);
    Task saved = repository.save(task);
    return toResponse(saved);
  }

  @Transactional
  public void delete(Long id) {
    if (!repository.existsById(id)) {
      throw new NotFoundException("Task not found: " + id);
    }
    repository.deleteById(id);
  }

  private void apply(Task task, TaskRequest request) {
    task.setTitle(request.getTitle());
    task.setDescription(request.getDescription());
    task.setCompleted(request.isCompleted());
    task.setPriority(request.getPriority());
  }

  private TaskResponse toResponse(Task task) {
    return new TaskResponse(
        task.getId(),
        task.getTitle(),
        task.getDescription(),
        task.isCompleted(),
        task.getPriority(),
        task.getCreatedAt()
    );
  }
}
