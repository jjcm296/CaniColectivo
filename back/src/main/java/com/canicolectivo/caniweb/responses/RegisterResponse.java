package com.canicolectivo.caniweb.responses;

public class RegisterResponse {
    private Integer id;
    private String username;
    private String email;

    public RegisterResponse(Integer id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public Integer getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}
