package com.canicolectivo.caniweb.responses;

public class LoginResponse {
    private String token;
    private long expiresIn;

    public LoginResponse() {}

    public LoginResponse(String token, long expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
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

    @Override
    public String toString() {
        String masked = token == null ? null : "<masked>";
        return "LoginResponse{" +
                "token=" + masked +
                ", expiresIn=" + expiresIn +
                '}';
    }
}
