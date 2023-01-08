package com.example.shop_project.service;


import com.example.shop_project.entity.RoleEntity;
import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.payload.request.SignUpRequest;
import com.example.shop_project.repository.RoleRepository;
import com.example.shop_project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public boolean insertUser(SignUpRequest request) {
        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setAddress(request.getAddress());
        user.setPassword((new BCryptPasswordEncoder()).encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setFullName(request.getFullname());
        Optional<RoleEntity> role = roleRepository.findById(2);
        user.setRole(role.get());
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
