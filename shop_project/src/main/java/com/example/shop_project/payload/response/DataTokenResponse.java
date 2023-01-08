package com.example.shop_project.payload.response;

public class DataTokenResponse {
    private String token;
    private String freshToken;
    private String role;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getFreshToken() {
        return freshToken;
    }

    public void setFreshToken(String freshToken) {
        this.freshToken = freshToken;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
