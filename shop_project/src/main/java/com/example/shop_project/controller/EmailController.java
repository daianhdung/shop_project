package com.example.shop_project.controller;

import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.jwt.JwtTokenHelper;
import com.example.shop_project.model.EmailDetail;
import com.example.shop_project.model.PasswordRandom;
import com.example.shop_project.payload.request.SignInRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.EmailService;
import com.example.shop_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.nio.charset.Charset;
import java.util.Random;

@RestController
@CrossOrigin
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;


    @PostMapping("/forgot")
    public ResponseEntity<?> forgotEmail(@RequestBody SignInRequest email) {
        System.out.println(email);
        boolean isFindEmail = userService.checkUser(email.getEmail());
        DataResponse dataResponse = new DataResponse();
        if (isFindEmail) {
            EmailDetail emailDetail = emailService.getEmailDetailWithTokenPassword(email.getEmail());
            emailService.sendEmail(emailDetail);
            dataResponse.setData("");
            dataResponse.setDesc("Sent email forgot password");
            dataResponse.setStatus(HttpStatus.OK.value());
            dataResponse.setSuccess(isFindEmail);
            return new ResponseEntity<>(dataResponse, HttpStatus.OK);
        } else  {
            dataResponse.setData("");
            dataResponse.setDesc("Cant find email");
            dataResponse.setStatus(HttpStatus.NO_CONTENT.value());
            dataResponse.setSuccess(isFindEmail);
            return new ResponseEntity<>(dataResponse, HttpStatus.BAD_REQUEST);
        }

    }
    @PostMapping("/changepasswordforgot")
    public ResponseEntity<?> sendPassword(@RequestParam(name = "token") String token,
                                          @RequestParam(name = "password") String password
    ) {
        PasswordRandom passwordRandom = userService.generateRandomPassword(token, password);
        DataResponse dataResponse = new DataResponse();
        if (passwordRandom != null) {
            dataResponse.setDesc("update change password success");
            dataResponse.setSuccess(true);
            EmailDetail emailDetail = emailService.getEmailDetailWithPassword(passwordRandom);
            emailService.sendEmail(emailDetail);
        } else {
            dataResponse.setDesc("update change password fail");
            dataResponse.setSuccess(false);
        }
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/checktokenforget/{token}")
    public ResponseEntity<?> checkTokenForget(@PathVariable(name = "token") String token) {
        DataResponse dataResponse = new DataResponse();
        boolean isContain = emailService.checkTokenForgot(token);
        dataResponse.setSuccess(isContain);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }


}
