package com.canicolectivo.caniweb.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterUserDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min=4, message = "Password must be at least 4 characters")
    private String password;

    @NotBlank(message = "Username is required")
    private String username;

    public RegisterUserDTO() {}

    public RegisterUserDTO(String email, String password, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    public @NotBlank(message = "Email is required") @Email(message = "Email must be valid") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is required") @Email(message = "Email must be valid") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password is required") @Size(min = 4, message = "Password must be at least 4 characters") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password is required") @Size(min = 4, message = "Password must be at least 4 characters") String password) {
        this.password = password;
    }

    public @NotBlank(message = "Username is required") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank(message = "Username is required") String username) {
        this.username = username;
    }
}
