package com.example.shop_project.controller.Admin;

import com.example.shop_project.dto.UserDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminUserController {

    @Autowired
    UserService userService;


    @GetMapping("/users")
    public ResponseEntity<?> getAllUser() {
        DataResponse dataResponse = new DataResponse();
        List<UserDTO> userDTOList = userService.getAllUser();
        dataResponse.setDesc("get all product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(userDTOList);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        UserDTO userDTO = userService.getUserById(id);
        dataResponse.setDesc("get user");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(userDTO != null);
        dataResponse.setData(userDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
