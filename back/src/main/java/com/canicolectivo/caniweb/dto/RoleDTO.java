package com.canicolectivo.caniweb.dto;

import jakarta.validation.constraints.NotBlank;

public class RoleDTO {
    private Integer id;

    @NotBlank
    private String name;

    public RoleDTO() {}

    public RoleDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public RoleDTO(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotBlank String getName() {
        return name;
    }

    public void setName(@NotBlank String name) {
        this.name = name;
    }
}
