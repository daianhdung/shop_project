package com.example.shop_project.service;

import com.example.shop_project.entity.UserEntity;

public interface AuthService {
    UserEntity checkLogin(String email);
}
