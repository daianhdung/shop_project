package com.example.shop_project.service;

import com.example.shop_project.dto.UserDTO;
import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.model.PasswordRandom;
import com.example.shop_project.payload.request.SignUpRequest;

public interface UserService {
    boolean insertUser(SignUpRequest request);
    boolean checkUser(String email);
    PasswordRandom generateRandomPassword(String token, String password);

    public UserEntity getUser(String email);

    public UserDTO getUserInform(String email);

    boolean updateUser(UserDTO userDTO);

    boolean updatePassword(UserDTO userDTO);
}
