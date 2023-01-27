package com.example.shop_project.controller.Admin;

import com.example.shop_project.dto.RoleDTO;
import com.example.shop_project.dto.UserDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.RoleService;
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
    @Autowired
    RoleService roleService;


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

    @GetMapping("/roles")
    public ResponseEntity<?> getAllRole() {
        DataResponse dataResponse = new DataResponse();
        List<RoleDTO> roleDTOList = roleService.findAllRole();
        dataResponse.setDesc("get all product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(roleDTOList);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") int idUser, @RequestBody UserDTO userDTO){
        boolean isSuccess = userService.updateUserById(userDTO);

        DataResponse dataResponse = new DataResponse();
        dataResponse.setDesc("Update role user");
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/user")
    public ResponseEntity<?> getUser(@RequestBody UserDTO userDTO) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = userService.insertUserByAdmin(userDTO);
        dataResponse.setDesc("new user");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
