package com.example.shop_project.controller.Admin;

import com.example.shop_project.dto.BrandDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminBrandController {
    @Autowired
    BrandService brandService;

    @GetMapping("/brand/all")
    public ResponseEntity<?> getAllBrand() {
        DataResponse dataResponse = new DataResponse();
        List<BrandDTO> brandDTOS = brandService.getALLBrand();
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(brandDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
