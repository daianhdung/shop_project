package com.example.shop_project.service;

import com.example.shop_project.dto.UserDTO;
import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.model.PasswordRandom;
import com.example.shop_project.payload.request.SignUpRequest;

import java.util.List;

public interface UserService {
    boolean insertUser(SignUpRequest request);
    boolean checkUser(String email);
    PasswordRandom generateRandomPassword(String token, String password);

    UserEntity getUser(String email);

    UserDTO getUserInform(String email);

    boolean updateUser(UserDTO userDTO);

    boolean updatePassword(UserDTO userDTO);

    List<UserDTO> getAllUser();

    UserDTO getUserById(int id);

    boolean updateUserById(UserDTO userDTO);

    boolean insertUserByAdmin(UserDTO userDTO);
}
