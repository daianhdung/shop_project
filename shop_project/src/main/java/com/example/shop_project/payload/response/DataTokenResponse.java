package com.example.shop_project.payload.response;

public class DataTokenResponse {
    private String token;
    private String freshToken;

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
}
