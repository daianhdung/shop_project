package com.example.shop_project.controller;

import com.example.shop_project.dto.BrandDTO;
import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.BrandService;
import com.example.shop_project.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/brand")
public class BrandController {
    @Autowired
    private BrandService brandService;

    @GetMapping("")
     public ResponseEntity<?> getALlBrand() {
        DataResponse dataResponse = new DataResponse();
        List<BrandDTO> list = brandService.getALLBrand();
        dataResponse.setSuccess(true);
        dataResponse.setData(list);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setDesc("List All Brand");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/top-5-smallest-brand")
    public ResponseEntity<?> get5BrandHaveSmallestAmountSold() {
        DataResponse dataResponse = new DataResponse();
        List<BrandDTO> list = brandService.get5BrandHaveSmallestAmountSold();
        dataResponse.setSuccess(true);
        dataResponse.setData(list);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setDesc("List 5 Smallest Amount Sold Brand");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
