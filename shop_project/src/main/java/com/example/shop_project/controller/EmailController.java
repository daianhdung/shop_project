package com.example.shop_project.controller;

import com.example.shop_project.model.EmailDetail;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.EmailService;
import com.example.shop_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mail")
public class EmailController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotEmail(@RequestParam(name = "email") String email) {
        boolean isFindEmail = userService.checkUser(email);
        DataResponse dataResponse = new DataResponse();
        if (isFindEmail) {
            EmailDetail emailDetail = emailService.getEmailDetailWithTokenPassword(email);
            emailService.sendEmail(emailDetail);
            dataResponse.setData("");
            dataResponse.setDesc("Sent email forgot password");
            dataResponse.setStatus(HttpStatus.OK.value());
            dataResponse.setSuccess(isFindEmail);
        } else  {
            dataResponse.setData("");
            dataResponse.setDesc("Cant find email");
            dataResponse.setStatus(HttpStatus.OK.value());
            dataResponse.setSuccess(isFindEmail);
        }
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/sendpassword/{token}")
    public ResponseEntity<?> sendPassword(@PathVariable(name = "token") String token) {

        return new ResponseEntity<>("", HttpStatus.OK);
    }


}