package com.canicolectivo.caniweb.responses;

import com.canicolectivo.caniweb.dto.UserDTO;

public class LoginResponse {
    private String token;
    private long expiresIn;
    private UserDTO user;

    public LoginResponse() {}

    public LoginResponse(String token, long expiresIn, UserDTO user) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public String toString() {
        String masked = token == null ? null : "<masked>";
        return "LoginResponse{" +
                "token=" + masked +
                ", expiresIn=" + expiresIn +
                '}';
    }
}
