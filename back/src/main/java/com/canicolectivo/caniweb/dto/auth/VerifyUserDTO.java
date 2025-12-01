package com.canicolectivo.caniweb.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class VerifyUserDTO {
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Verification code is required")
    //@Size(min=4, message = "Verification code must be at least 4 characters")
    private String verificationCode;

    public @NotBlank(message = "Email is required") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email is required") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Verification code is required") String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(@NotBlank(message = "Verification code is required") String verificationCode) {
        this.verificationCode = verificationCode;
    }
}
