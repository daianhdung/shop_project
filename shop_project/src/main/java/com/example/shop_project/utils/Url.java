package com.example.shop_project.utils;

public enum Url {
    Root("http://localhost:8080/"),
    ChangePassword("http://localhost:3000/change?token="),
    Image("http://localhost:8080/images/");
    private String path;
    Url(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}

