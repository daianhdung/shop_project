package com.example.shop_project.service.imp;


import com.example.shop_project.dto.RoleDTO;
import com.example.shop_project.dto.UserDTO;
import com.example.shop_project.entity.RoleEntity;
import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.jwt.JwtTokenHelper;
import com.example.shop_project.model.PasswordRandom;
import com.example.shop_project.payload.request.SignUpRequest;
import com.example.shop_project.repository.RoleRepository;
import com.example.shop_project.repository.UserRepository;
import com.example.shop_project.service.UserService;
import com.example.shop_project.utils.AuthenUtil;
import com.example.shop_project.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    AuthenUtil authenUtil;


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

    @Override
    public UserDTO getUserInform(String email) {
        UserDTO userDTO = new UserDTO();
        UserEntity user = userRepository.findUserEntityByEmail(email);
        userDTO.setEmail(user.getEmail());
        userDTO.setFullname(user.getFullName());
        userDTO.setAddress(user.getAddress());
        userDTO.setPhone(user.getPhone());
        return userDTO;
    }

    @Override
    public boolean updateUser(UserDTO userDTO) {
        UserEntity user = userRepository.findUserEntityByEmail(authenUtil.getEmail());
        user.setAddress(userDTO.getAddress());
        user.setPhone(userDTO.getPhone());
        user.setFullName(userDTO.getFullname());
        try{
            userRepository.save(user);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean updatePassword(UserDTO userDTO) {
        UserEntity user = userRepository.findUserEntityByEmail(authenUtil.getEmail());
        try{
            boolean isMatchPassword = passwordEncoder.matches(userDTO.getPassword(), user.getPassword());
            System.out.println(userDTO.getPassword());
            System.out.println(user.getPassword());
            if(isMatchPassword){
                user.setPassword(passwordEncoder.encode(userDTO.getNewPassword()));
                userRepository.save(user);
                return true;
            }else {
                return false;
            }
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<UserDTO> getAllUser() {
        List<UserDTO> userDTOList = new ArrayList<>();
        List<UserEntity> getAllUser = userRepository.findAll();
        getAllUser.forEach(userEntity -> {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(userEntity.getId());
            userDTO.setEmail(userEntity.getEmail());
            userDTO.setPhone(userEntity.getPhone());
            userDTO.setAddress(userEntity.getAddress());
            userDTO.setFullname(userEntity.getFullName());
            userDTO.setRoleName(userEntity.getRole().getName());
            userDTOList.add(userDTO);
        });
        return userDTOList;
    }

    @Override
    public UserDTO getUserById(int id) {
        Optional<UserEntity> user = userRepository.findById(id);
        if(user.isPresent()){
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.get().getId());
            userDTO.setEmail(user.get().getEmail());
            userDTO.setPhone(user.get().getPhone());
            userDTO.setAddress(user.get().getAddress());
            userDTO.setFullname(user.get().getFullName());

            RoleDTO roleDTO = new RoleDTO();
            roleDTO.setId(user.get().getRole().getId());
            roleDTO.setName(user.get().getRole().getName());
            userDTO.setRole(roleDTO);
            return userDTO;
        }

        return null;
    }

    @Override
    public boolean updateUserById(UserDTO userDTO) {
        Optional<UserEntity> user = userRepository.findById(userDTO.getId());

        RoleEntity role = roleRepository.findByName(userDTO.getRoleName());
        if(user.isPresent()){
            user.get().setRole(role);
        }
        try {
            userRepository.save(user.get());
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean insertUserByAdmin(UserDTO userDTO) {
        UserEntity user = new UserEntity();
        user.setEmail(stringUtil.parseEmail(userDTO.getEmail()));
        user.setAddress(userDTO.getAddress());
        user.setPassword(passwordEncoder.encode(stringUtil.removeWhiteSpaceBeginAndEnd(userDTO.getPassword())));
        user.setPhone(userDTO.getPhone());
        user.setFullName(userDTO.getFullname());
        RoleEntity role = roleRepository.findByName(userDTO.getRoleName());
        user.setRole(role);
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
