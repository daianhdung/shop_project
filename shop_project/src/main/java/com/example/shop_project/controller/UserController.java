package com.example.shop_project.controller;


import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.payload.request.SignUpRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    UserService userService;


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
}
