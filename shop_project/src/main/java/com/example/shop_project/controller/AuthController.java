package com.example.shop_project.controller;

import com.example.shop_project.jwt.JwtTokenHelper;
import com.example.shop_project.payload.request.SignInRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.payload.response.DataTokenResponse;
import com.example.shop_project.service.AuthService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.time.Duration;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenHelper jwtTokenHelper;
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInRequest request, HttpServletResponse response) {
        Gson gson = new Gson();

        UsernamePasswordAuthenticationToken authRequest =
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        Authentication auth = authenticationManager.authenticate(authRequest);
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(auth);

        long expiredDate = 8 * 60 * 60 * 1000;
        long refreshExpiredDate = 8 * 60 * 60 * 1000;


        String token = jwtTokenHelper.generateToken(request.getEmail(),"authen", expiredDate);
        String refreshToken = jwtTokenHelper.generateToken(request.getEmail(),"refresh", refreshExpiredDate);

        DataTokenResponse dataTokenResponse = new DataTokenResponse();
        dataTokenResponse.setToken(token);
        dataTokenResponse.setFreshToken(refreshToken);

        DataResponse dataResponse = new DataResponse();
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setDesc("");
        dataResponse.setData(dataTokenResponse);
        dataResponse.setSuccess(true);

        return new ResponseEntity<>(dataResponse , HttpStatus.OK);
    }
}
