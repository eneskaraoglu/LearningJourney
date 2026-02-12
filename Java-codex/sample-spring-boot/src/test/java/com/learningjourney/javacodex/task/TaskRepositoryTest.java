package com.learningjourney.javacodex.task;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class TaskRepositoryTest {
  @Autowired
  private TaskRepository repository;

  @Test
  void findByCompletedReturnsMatches() {
    Task done = new Task();
    done.setTitle("Done");
    done.setCompleted(true);

    Task todo = new Task();
    todo.setTitle("Todo");
    todo.setCompleted(false);

    repository.saveAll(List.of(done, todo));

    List<Task> results = repository.findByCompleted(true);
    assertThat(results).hasSize(1);
    assertThat(results.get(0).getTitle()).isEqualTo("Done");
  }
}
