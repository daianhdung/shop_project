package com.example.shop_project.controller;


import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;


@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("/insert")
    public ResponseEntity<?> insertPrpduct() {
        return new ResponseEntity<>("test", HttpStatus.OK);
    }
    @GetMapping("/totalpage")
    public ResponseEntity<?> getTotalPage() {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setDesc("Total Page");
        dataResponse.setSuccess(true);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setData(productService.getTotalPage());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/page/{current}")
    public ResponseEntity<?> getProductWithPage(@PathVariable(name = "current") int current) {
        ProductDTO productDTO = productService.getProducts(current);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(productDTO);
        dataResponse.setSuccess(true);
        dataResponse.setDesc("get product with current page");
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @GetMapping("/top-product")
    public ResponseEntity<?> getTopProductByAmountSold(){
        List<ProductDTO> productDTOList = productService.getProductByTop10AmountOfSold();
        DataResponse dataResponse = new DataResponse();
        dataResponse.setStatus(200);
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTOList);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/top-product-branch")
    public ResponseEntity<?> getTopProductByBranchAndPrice(){
        List<ProductDTO> productDTOList = productService.getFeaturedProductByTop1Price();
        DataResponse dataResponse = new DataResponse();
        dataResponse.setStatus(200);
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTOList);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    

}
