package com.example.shop_project.service.imp;

import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.jwt.JwtTokenHelper;
import com.example.shop_project.model.EmailDetail;
import com.example.shop_project.model.PasswordRandom;
import com.example.shop_project.service.EmailService;
import com.example.shop_project.utils.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class EmailServiceImp implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private JwtTokenHelper jwtTokenHelper;
    @Autowired
    private RedisTemplate redisTemplate;
    @Value("${spring.mail.username}")
    private String sender;
    @Value("${redis.expireTokenForgot}")
    private long expiredDate;

    @Override
    public EmailDetail getEmailDetailWithTokenPassword(String email) {

        String token = jwtTokenHelper.generateToken(email, expiredDate);

        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setSubject("Forgot Email " + email);
        emailDetail.setRecipient(email);
        emailDetail.setMsgBody(Url.ChangePassword.getPath() + token);

        redisTemplate.opsForValue().set(email, token);
        redisTemplate.expire(email, Duration.ofDays(expiredDate));

        return emailDetail;
    }

    @Override
    public EmailDetail getEmailDetailWithPassword(PasswordRandom passwordRandom) {
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setSubject("Send password to " + passwordRandom.getEmail());
        emailDetail.setRecipient(passwordRandom.getEmail());
        emailDetail.setMsgBody("Paswword: " + passwordRandom.getPassword());
        return emailDetail;
    }

    @Override
    public void sendEmail(EmailDetail emailDetail) {
        try {

            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(emailDetail.getRecipient());
            mailMessage.setText(emailDetail.getMsgBody());
            mailMessage.setSubject(emailDetail.getSubject());

            javaMailSender.send(mailMessage);
        }

        catch (Exception e) {
            System.out.println("Send Mail" + e.getMessage());
        }
    }

    @Override
    public boolean checkTokenForgot(String token) {
        if (jwtTokenHelper.validateToken(token)) {
            String email = jwtTokenHelper.decodeToken(token);
            if (Boolean.TRUE.equals(redisTemplate.hasKey(email)) && redisTemplate.opsForValue().get(email).equals(token) ) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
