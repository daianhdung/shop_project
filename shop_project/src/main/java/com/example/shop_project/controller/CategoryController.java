package com.example.shop_project.controller;


import com.example.shop_project.dto.CategoryDTO;
import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.CategoryService;
import com.example.shop_project.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getALlCategory() {
        DataResponse dataResponse = new DataResponse();
        List<CategoryDTO> list = categoryService.getAllCategory();
        dataResponse.setSuccess(true);
        dataResponse.setData(list);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setDesc("List All Category");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
