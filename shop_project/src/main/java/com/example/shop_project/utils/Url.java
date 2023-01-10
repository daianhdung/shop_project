package com.example.shop_project.utils;

public enum Url {
    Root("http://localhost:8080/"),
    Email("http://localhost:8080/api/email/sendpassword/"),
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

