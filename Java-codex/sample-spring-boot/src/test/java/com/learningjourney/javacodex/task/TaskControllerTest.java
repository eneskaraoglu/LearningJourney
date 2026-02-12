package com.learningjourney.javacodex.task;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(TaskController.class)
class TaskControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  private TaskService taskService;

  @Test
  void createReturnsCreated() throws Exception {
    TaskRequest request = new TaskRequest();
    request.setTitle("Learn Spring");
    request.setDescription("Work through module 6");
    request.setCompleted(false);
    request.setPriority(2);

    TaskResponse response = new TaskResponse(1L, "Learn Spring", "Work through module 6", false, 2, Instant.now());
    when(taskService.create(any(TaskRequest.class))).thenReturn(response);

    mockMvc.perform(post("/api/tasks")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
      .andExpect(status().isCreated())
      .andExpect(jsonPath("$.id").value(1));
  }

  @Test
  void createValidatesInput() throws Exception {
    TaskRequest request = new TaskRequest();
    request.setTitle("");

    mockMvc.perform(post("/api/tasks")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
      .andExpect(status().isBadRequest())
      .andExpect(jsonPath("$.fields.title").exists());
  }
}
