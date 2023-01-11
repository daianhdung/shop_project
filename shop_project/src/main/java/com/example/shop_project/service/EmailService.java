package com.example.shop_project.service;

import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.model.EmailDetail;
import com.example.shop_project.model.PasswordRandom;

public interface EmailService {
    void sendEmail(EmailDetail emailDetail);
    EmailDetail getEmailDetailWithTokenPassword(String email);
    EmailDetail getEmailDetailWithPassword(PasswordRandom passwordRandom );
    boolean checkTokenForgot(String token);
}
