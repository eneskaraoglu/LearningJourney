package com.learningjourney.javacodex.task;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class TaskIntegrationTest {
  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private TaskRepository repository;

  @Test
  void crudFlowWorks() throws Exception {
    TaskRequest request = new TaskRequest();
    request.setTitle("Integration Task");
    request.setDescription("End-to-end test");
    request.setCompleted(false);
    request.setPriority(1);

    String createResponse = mockMvc.perform(post("/api/tasks")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
      .andExpect(status().isCreated())
      .andReturn()
      .getResponse()
      .getContentAsString();

    TaskResponse created = objectMapper.readValue(createResponse, TaskResponse.class);
    assertThat(created.getId()).isNotNull();

    request.setCompleted(true);
    mockMvc.perform(put("/api/tasks/{id}", created.getId())
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
      .andExpect(status().isOk());

    mockMvc.perform(get("/api/tasks/{id}", created.getId()))
      .andExpect(status().isOk());

    mockMvc.perform(delete("/api/tasks/{id}", created.getId()))
      .andExpect(status().isNoContent());

    List<Task> remaining = repository.findAll();
    assertThat(remaining).isEmpty();
  }
}
