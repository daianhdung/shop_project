package com.example.shop_project.service.imp;

import com.example.shop_project.jwt.JwtTokenHelper;
import com.example.shop_project.model.EmailDetail;
import com.example.shop_project.service.EmailService;
import com.example.shop_project.utils.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImp implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    JwtTokenHelper jwtTokenHelper;
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public EmailDetail getEmailDetailWithTokenPassword(String email) {
        long expiredDate = 10 * 1000;
        long refreshExpiredDate = 8 * 60 * 60 * 1000;
        String token = jwtTokenHelper.generateToken(email,"forgot", expiredDate);
        EmailDetail emailDetail = new EmailDetail();
        emailDetail.setSubject("Forgot Email " + email);
        emailDetail.setRecipient(email);
        emailDetail.setMsgBody(Url.Email.getPath() + token);
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
}
