package com.example.shop_project.controller;

import com.example.shop_project.dto.CategoryDTO;
import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.dto.ProductDetailDTO;
import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.payload.request.CateSizeRequest;
import com.example.shop_project.payload.request.ProductRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.CategoryService;
import com.example.shop_project.service.ProductService;
import com.example.shop_project.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    ProductService productService;
    @Autowired
    CategoryService categoryService;
    @Autowired
    SizeService sizeService;


    @GetMapping("/product/get/{id}")
    public ResponseEntity<?> getProduct(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        ProductDetailDTO productDetailDTO = productService.getProduct(id);
        dataResponse.setDesc("get product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(productDetailDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/product/all")
    public ResponseEntity<?> getAllProduct() {
        DataResponse dataResponse = new DataResponse();
        ProductDTO productDTO = productService.getProducts();
        dataResponse.setDesc("get all product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(productDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/product/insert")
    public ResponseEntity<?> insertProduct(@RequestBody ProductRequest product) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = productService.insertProduct(product);
        dataResponse.setDesc("insert product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PutMapping("/product/update")
    public ResponseEntity<?> updateProduct(@RequestBody ProductRequest product) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = productService.updateProduct(product);
        dataResponse.setDesc("update product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = productService.deleteProduct(id);
        dataResponse.setDesc("delete product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }




    @GetMapping("/category/get/{id}")
    public ResponseEntity<?> getCategory(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        CategoryDTO categoryDTO = categoryService.getCategory(id);
        dataResponse.setDesc("get category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(categoryDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/category/all")
    public ResponseEntity<?> getAllCategory() {
        DataResponse dataResponse = new DataResponse();
        List<CategoryDTO> categoryDTOS = categoryService.getAllCategory();
        dataResponse.setDesc("get All category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(categoryDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/category/insert")
    public ResponseEntity<?> insertCategory(@RequestBody CateSizeRequest category) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = categoryService.insertCategory(category);
        dataResponse.setDesc("insert category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PutMapping("/category/update")
    public ResponseEntity<?> updateCategory(@RequestBody CateSizeRequest category) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = categoryService.updateCategory(category);
        dataResponse.setDesc("update category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @DeleteMapping("/category/delete/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = categoryService.deleteCategory(id);
        dataResponse.setDesc("delete category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }



    @GetMapping("/size/get/{id}")
    public ResponseEntity<?> getSize(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        SizeDTO sizeDTO = sizeService.getSize(id);
        dataResponse.setDesc("get size");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(sizeDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/size/all")
    public ResponseEntity<?> getAllSize() {
        DataResponse dataResponse = new DataResponse();
        List<SizeDTO> sizeDTOS = sizeService.getAllSize();
        dataResponse.setDesc("get All size");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(sizeDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/size/insert")
    public ResponseEntity<?> insertSize(@RequestBody CateSizeRequest size) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = sizeService.insertSize(size);
        dataResponse.setDesc("insert size");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PutMapping("/size/update")
    public ResponseEntity<?> updateSize(@RequestBody CateSizeRequest size) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = sizeService.updateSize(size);
        dataResponse.setDesc("update size");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @DeleteMapping("/size/delete/{id}")
    public ResponseEntity<?> deleteSize(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = sizeService.deleteSize(id);
        dataResponse.setDesc("delete category");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
