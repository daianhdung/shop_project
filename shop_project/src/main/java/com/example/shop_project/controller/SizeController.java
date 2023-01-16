package com.example.shop_project.controller;

import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/size")
public class SizeController {
    @Autowired
    private SizeService sizeService;

    @GetMapping("")
     public ResponseEntity<?> getALlSize() {
        DataResponse dataResponse = new DataResponse();
        List<SizeDTO> list = sizeService.getAllSize();
        dataResponse.setSuccess(true);
        dataResponse.setData(list);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setDesc("List All Size");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/{productId}")
    public ResponseEntity<?> getSizeByProductId(@PathVariable(name = "productId") int id) {
        DataResponse dataResponse = new DataResponse();
        List<SizeDTO> list = sizeService.getSizeByProductId(id);
        dataResponse.setSuccess(true);
        dataResponse.setData(list);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setDesc("List All Size");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
