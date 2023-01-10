package com.example.shop_project.service;

import com.example.shop_project.model.EmailDetail;

public interface EmailService {
    void sendEmail(EmailDetail emailDetail);
    EmailDetail getEmailDetailWithTokenPassword(String email);
}
