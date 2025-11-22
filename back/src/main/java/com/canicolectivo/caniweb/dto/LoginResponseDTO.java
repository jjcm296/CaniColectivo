package com.canicolectivo.caniweb.dto;

import com.canicolectivo.caniweb.model.User;

import java.util.Set;
import java.util.stream.Collectors;

public class LoginResponseDTO {
    private Integer id;
    private String email;
    private Set<String> roles;

    public LoginResponseDTO() {}

    public LoginResponseDTO(Integer id, String email, Set<String> roles) {
        this.id = id;
        this.email = email;
        this.roles = roles;
    }

    public static LoginResponseDTO fromUser(User user) {
        Set<String> roleNames = user.getRoles().stream()
                .map(r -> r.getName())
                .collect(Collectors.toSet());
        return new LoginResponseDTO(user.getId(), user.getEmail(), roleNames);
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}