package com.example.shop_project.controller;

import com.example.shop_project.dto.ProductSizeDTO;
import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.ProductSizeService;
import com.example.shop_project.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/size")
public class SizeController {
    @Autowired
    private SizeService sizeService;
    @Autowired
    ProductSizeService productSizeService;

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

    @GetMapping("/amount")
    public ResponseEntity<?> getAmountByProductIdAndSizeId(@RequestParam("productId") int productId,
                                                           @RequestParam("sizeId") int sizeId){
        DataResponse dataResponse = new DataResponse();
        int amount = productSizeService.findAmountByProductIdAndSizeId(productId, sizeId);
        dataResponse.setSuccess(true);
        dataResponse.setData(amount);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
