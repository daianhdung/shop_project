package com.example.shop_project.controller;


import com.example.shop_project.dto.UserDTO;
import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.payload.request.SignUpRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.UserService;
import com.example.shop_project.utils.AuthenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;


@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    AuthenUtil authenUtil;

    @GetMapping()
    public ResponseEntity<?> getUser(){
        DataResponse dataResponse = new DataResponse();
        String email = authenUtil.getEmail();
        if(email != null){
            UserDTO userDTO = userService.getUserInform(email);
            dataResponse.setData(userDTO);
            dataResponse.setSuccess(true);
        }else {
            dataResponse.setSuccess(false);
            dataResponse.setData("lỗi token");
        }
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


    @PostMapping()
    public ResponseEntity<?> signup(@RequestBody SignUpRequest request){
        if(userService.getUser(request.getEmail()) != null){
            return new ResponseEntity<>("Email này đã được đăng kí", HttpStatus.BAD_REQUEST);
        }else {
            userService.insertUser(request);
            DataResponse dataResponse = new DataResponse();
            dataResponse.setStatus(200);
            dataResponse.setSuccess(true);
            dataResponse.setDesc("Đăng kí thành công");
            return new ResponseEntity<>(dataResponse, HttpStatus.OK);
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateProfile(@RequestBody UserDTO userDTO){
        boolean isSuccess = userService.updateUser(userDTO);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setSuccess(isSuccess);
        dataResponse.setDesc(isSuccess ? "Update thành công" : "Update user đã có lỗi xảy ra");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PutMapping("/change-password")
    public ResponseEntity<?> updatePassword(@RequestBody UserDTO userDTO){
        boolean isSuccess = userService.updatePassword(userDTO);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setSuccess(isSuccess);
        dataResponse.setDesc(isSuccess ? "Update thành công" : "Mật khẩu cũ không chính xác");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


}
