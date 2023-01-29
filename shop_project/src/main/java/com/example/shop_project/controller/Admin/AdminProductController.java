package com.example.shop_project.controller.Admin;

import com.example.shop_project.dto.*;
import com.example.shop_project.payload.request.CateSizeRequest;
import com.example.shop_project.payload.request.ProductRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.*;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminProductController {
    @Autowired
    ProductService productService;
    @Autowired
    CategoryService categoryService;
    @Autowired
    SizeService sizeService;
    @Autowired
    BrandService brandService;
    @Autowired
    OrderService orderService;



    @GetMapping("/product/get/{id}")
    public ResponseEntity<?> getProduct(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        ProductDetailDTO productDetailDTO = productService.getProduct(id);
        dataResponse.setDesc("get product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(productDetailDTO != null);
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
    public ResponseEntity<?> insertProduct(@RequestParam(name = "product") String product,
                                           @RequestParam(name = "mainImage")MultipartFile file,
                                           @RequestParam(name = "images")MultipartFile[] multiFile) {
        System.out.println(file);
        System.out.println(multiFile);
        DataResponse dataResponse = new DataResponse();
        Gson gson = new Gson();
        boolean isSuccess = productService.insertProduct(gson.fromJson(product,ProductRequest.class), file, multiFile);
        dataResponse.setDesc("insert product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @PostMapping("/product/update")
    public ResponseEntity<?> updateProduct(@RequestParam(name = "product") String product,
                                           @RequestParam(name = "mainImage", required = false)MultipartFile file,
                                           @RequestParam(name = "images", required = false)MultipartFile[] multiFile) {

        DataResponse dataResponse = new DataResponse();
        Gson gson = new Gson();
        boolean isSuccess = productService.updateProduct(gson.fromJson(product,ProductRequest.class), file, multiFile);
        dataResponse.setDesc("update product");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/product/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = productService.deleteProduct(id);
        dataResponse.setDesc("delete product " + id);
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    
}
