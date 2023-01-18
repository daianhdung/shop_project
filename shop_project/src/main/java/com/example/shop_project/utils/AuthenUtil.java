package com.example.shop_project.utils;

import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.stereotype.Component;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@Component
public class AuthenUtil {


    public String getEmail() {
        var authentication = getContext().getAuthentication();
        return authentication instanceof AnonymousAuthenticationToken ? null
                :authentication.getPrincipal().toString();
    }

}
