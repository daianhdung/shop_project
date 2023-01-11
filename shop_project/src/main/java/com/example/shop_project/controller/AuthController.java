package com.example.shop_project.controller;

import com.example.shop_project.jwt.JwtTokenHelper;
import com.example.shop_project.payload.request.SignInRequest;
import com.example.shop_project.payload.request.SignUpRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.payload.response.DataTokenResponse;
import com.example.shop_project.service.AuthService;
import com.example.shop_project.service.UserService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import javax.validation.Valid;
import java.time.Duration;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;
    @Autowired
    UserService userService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenHelper jwtTokenHelper;
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SignInRequest request, HttpServletResponse response) {
        Gson gson = new Gson();

        try{
            UsernamePasswordAuthenticationToken authRequest =
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
            Authentication auth = authenticationManager.authenticate(authRequest);
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(auth);
            long expiredDate = 8 * 60 * 60 * 1000;
            long refreshExpiredDate = 8 * 60 * 60 * 1000;
            String token = jwtTokenHelper.generateToken(request.getEmail(),"authen",securityContext.getAuthentication().getAuthorities().iterator().next().toString() , expiredDate);
            String refreshToken = jwtTokenHelper.generateToken(request.getEmail(),"refresh",securityContext.getAuthentication().getAuthorities().iterator().next().toString() ,refreshExpiredDate);

            DataTokenResponse dataTokenResponse = new DataTokenResponse();
            dataTokenResponse.setToken(token);
            dataTokenResponse.setFreshToken(refreshToken);
            dataTokenResponse.setRole(securityContext.getAuthentication().getAuthorities().iterator().next().toString());

            DataResponse dataResponse = new DataResponse();
            dataResponse.setStatus(HttpStatus.OK.value());
            dataResponse.setDesc("");
            dataResponse.setData(dataTokenResponse);
            dataResponse.setSuccess(true);
            return new ResponseEntity<>(dataResponse , HttpStatus.OK);
        }catch (BadCredentialsException e){
            return new ResponseEntity<>("Sai tài khoản hoặc mật khẩu" , HttpStatus.BAD_REQUEST);
        }catch (UsernameNotFoundException e){
            return new ResponseEntity<>("Tài khoản không tồn tại" , HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
        boolean isSuccess = userService.insertUser(request);
        DataResponse dataResponse = new DataResponse();
        if (isSuccess) {
            UsernamePasswordAuthenticationToken authRequest =
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
            Authentication auth = authenticationManager.authenticate(authRequest);
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(auth);

            long expiredDate = 8 * 60 * 60 * 1000;
            long refreshExpiredDate = 8 * 60 * 60 * 1000;

            String token = jwtTokenHelper.generateToken(request.getEmail(), "authen", securityContext.getAuthentication().getAuthorities().iterator().next().toString(), expiredDate);
            String refreshToken = jwtTokenHelper.generateToken(request.getEmail(), "refresh", securityContext.getAuthentication().getAuthorities().iterator().next().toString(), refreshExpiredDate);

            DataTokenResponse dataTokenResponse = new DataTokenResponse();
            dataTokenResponse.setToken(token);
            dataTokenResponse.setFreshToken(refreshToken);
            dataTokenResponse.setRole(securityContext.getAuthentication().getAuthorities().iterator().next().toString());

            dataResponse.setDesc("SignUp sucess");
            dataResponse.setStatus(HttpStatus.OK.value());
            dataResponse.setSuccess(isSuccess);
            dataResponse.setData(dataTokenResponse);

        } else {
            dataResponse.setDesc("SignUp fail");
            dataResponse.setStatus(HttpStatus.OK.value());
            dataResponse.setSuccess(isSuccess);
            dataResponse.setData("");
        }
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
