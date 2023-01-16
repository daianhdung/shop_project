package com.example.shop_project.controller;


import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.payload.request.FilterProductRequest;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
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
    public ResponseEntity<?> getTotalPage(@RequestBody FilterProductRequest filterProduct) {
        DataResponse dataResponse = new DataResponse();
        dataResponse.setDesc("Total Page");
        dataResponse.setSuccess(true);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setData(productService.getTotalPage(filterProduct));
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/page/{}")
    public ResponseEntity<?> getProductWithPage(@PathVariable(name = "current") int current) {
        ProductDTO productDTO = productService.getProducts(current);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(productDTO);
        dataResponse.setSuccess(true);
        dataResponse.setDesc("get product with current page");
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }
    @PostMapping("/filter")
    public ResponseEntity<?> getProductWithPageByFilter(@RequestBody FilterProductRequest filterProduct) {
        ProductDTO productDTO = productService.getProductByFilter(filterProduct);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(productDTO);
        dataResponse.setSuccess(true);
        dataResponse.setDesc("get product with current page by filter");
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
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
    @GetMapping("/detail-product/{id}")
    public ResponseEntity<?> getDetailProduct(@PathVariable("id") int id){
        ProductDTO productDTO = productService.getDetailProduct(id);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setStatus(200);
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTO);
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

    @GetMapping("/search-product")
    public ResponseEntity<?> searchProduct(@RequestParam("keyword") String name,
                                           @RequestParam("type") String type){
        List<ProductDTO> productDTOList = productService.searchProduct(name);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setStatus(200);
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTOList);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/search-productby")
    public ResponseEntity<?> searchProduct(@RequestParam(value = "categoryId", required = false) Integer catetegoryId,
                                           @RequestParam(value = "brandId", required = false) Integer brandId){
        List<ProductDTO> productDTOList = new ArrayList<>();
        if(catetegoryId != null){
            productDTOList = productService.searchProductByCategoryId(catetegoryId);
        } else if (brandId != null) {
            productDTOList = productService.searchProductByBrandId(brandId);
        }
        DataResponse dataResponse = new DataResponse();
        dataResponse.setStatus(200);
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTOList);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
