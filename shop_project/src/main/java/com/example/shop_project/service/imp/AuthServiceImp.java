package com.example.shop_project.service;

import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthServiceImp implements AuthService{
    @Autowired
    UserRepository userRepository;
    @Override
    public UserEntity checkLogin(String email) {
        List<UserEntity> users = userRepository.findByEmail(email);
        return users.size() > 0 ? users.get(0) : null;
    }
}
