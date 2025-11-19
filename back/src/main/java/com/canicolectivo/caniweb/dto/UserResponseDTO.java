package com.canicolectivo.caniweb.dto;

public class UserResponseDTO {
    private Integer id;
    private String email;

    public UserResponseDTO() {}

    public UserResponseDTO(Integer id, String email) {
        this.id = id;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}