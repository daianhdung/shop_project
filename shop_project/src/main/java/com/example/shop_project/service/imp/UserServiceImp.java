package com.example.shop_project.service.imp;


import com.example.shop_project.entity.RoleEntity;
import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.jwt.JwtTokenHelper;
import com.example.shop_project.model.PasswordRandom;
import com.example.shop_project.payload.request.SignUpRequest;
import com.example.shop_project.repository.RoleRepository;
import com.example.shop_project.repository.UserRepository;
import com.example.shop_project.service.UserService;
import com.example.shop_project.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.Optional;
import java.util.Random;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    RedisTemplate redisTemplate;
    @Autowired
    StringUtil stringUtil;
    @Autowired
    private JwtTokenHelper jwtTokenHelper;



    @Override
    public boolean insertUser(SignUpRequest request) {
        UserEntity user = new UserEntity();
        user.setEmail(stringUtil.parseEmail(request.getEmail()));
        user.setAddress(request.getAddress());
        user.setPassword(passwordEncoder.encode(stringUtil.removeWhiteSpaceBeginAndEnd(request.getPassword())));
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

    @Override
    public boolean checkUser(String email) {
        return userRepository.findByEmail(email).size() > 0 ? true : false;
    }

    @Override
    public PasswordRandom generateRandomPassword(String token, String password) {
        boolean isSucess = jwtTokenHelper.validateToken(token);
        if (isSucess) {
            String email = jwtTokenHelper.decodeToken(token);
            UserEntity user = userRepository.findUserEntityByEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            try {
                userRepository.save(user);
                PasswordRandom passwordRandom = new PasswordRandom();
                passwordRandom.setEmail(email);
                passwordRandom.setPassword(password);
                redisTemplate.opsForValue().getAndDelete(email);
                return passwordRandom;
            } catch (Exception e) {
                return null;
            }

        } else {
            return null;
        }
    }

    @Override
    public UserEntity getUser(String email) {
        return userRepository.findByEmail(email).size() > 0 ? userRepository.findByEmail(email).get(0) : null;
    }
}
