package com.canicolectivo.caniweb.controller;
import com.canicolectivo.caniweb.model.Role;
import com.canicolectivo.caniweb.service.RoleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.lang.reflect.Field;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(RoleController.class)
class RoleControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // provided by Spring Boot auto-config

    @MockitoBean
    private RoleService roleService;

    private static void setId(Role role, Integer id) {
        try {
            Field idField = Role.class.getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(role, id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    @DisplayName("POST /api/roles - create role successfully returns 201, Location header and body")
    void createRole_success() throws Exception {
        String roleName = "Admin";

        Role saved = new Role(roleName);
        setId(saved, 1);

        when(roleService.createRole(ArgumentMatchers.eq(roleName))).thenReturn(Optional.of(saved));

        String requestJson = objectMapper.writeValueAsString(new RoleDtoForTest(roleName));

        mockMvc.perform(post("/api/roles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", org.hamcrest.Matchers.endsWith("/api/roles/1")))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value(roleName));
    }

    @Test
    @DisplayName("POST /api/roles - conflict when role already exists (returns 409)")
    void createRole_conflict() throws Exception {
        String roleName = "Admin";

        when(roleService.createRole(ArgumentMatchers.eq(roleName))).thenReturn(Optional.empty());

        String requestJson = objectMapper.writeValueAsString(new RoleDtoForTest(roleName));

        mockMvc.perform(post("/api/roles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isConflict());
    }

    @Test
    @DisplayName("GET /api/roles/{id} - found returns 200 and role")
    void getRoleById_found() throws Exception {
        Role role = new Role("Artist");
        setId(role, 42);

        when(roleService.getRole(ArgumentMatchers.eq(42))).thenReturn(Optional.of(role));

        mockMvc.perform(get("/api/roles/{id}", 42))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(42))
                .andExpect(jsonPath("$.name").value("Artist"));
    }

    @Test
    @DisplayName("GET /api/roles/{id} - not found returns 404")
    void getRoleById_notFound() throws Exception {
        when(roleService.getRole(ArgumentMatchers.eq(999))).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/roles/{id}", 999))
                .andExpect(status().isNotFound());
    }

    // Small helper DTO matching controller input
    static class RoleDtoForTest {
        public String name;

        public RoleDtoForTest() {}

        public RoleDtoForTest(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}