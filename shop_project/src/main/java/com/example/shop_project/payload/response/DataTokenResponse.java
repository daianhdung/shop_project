package com.example.shop_project.payload.response;

public class DataTokenResponse {
    private String token;
    private String freshToken;
    private String role;
    private long expire;

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

    public long getExpire() {
        return expire;
    }

    public void setExpire(long expire) {
        this.expire = expire;
    }
}
