package com.example.shop_project.controller.Admin;


import com.example.shop_project.dto.HeaderLayoutDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.AdminHomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminHomeController {
    @Autowired
    AdminHomeService statService;

    @GetMapping("/header")
    public ResponseEntity<?> getHeaderStats() {
        DataResponse dataResponse = new DataResponse();
        HeaderLayoutDTO headerLayoutDTO = statService.getHeaderLayout();
        dataResponse.setData(headerLayoutDTO);
        dataResponse.setSuccess(true);
        dataResponse.setDesc("getHeaderStats");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
