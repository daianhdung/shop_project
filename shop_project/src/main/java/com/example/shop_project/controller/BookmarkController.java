package com.example.shop_project.controller;

import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.payload.request.FilterProductRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookmark")
@CrossOrigin
public class BookmarkController {

    @Autowired
    BookmarkService bookmarkService;

    @PostMapping("")
    public ResponseEntity<?> getProductWithPageByFilter( @RequestBody FilterProductRequest filterProduct) {
        ProductDTO productDTO = bookmarkService.getProductBookMark(filterProduct);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(productDTO);
        dataResponse.setSuccess(true);
        dataResponse.setDesc("get product with current page by filter");
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/insert/{id}")
    public ResponseEntity<?> insertBookmark(@PathVariable(name = "id")int id ) {
        boolean isSuccess = bookmarkService.insertBookmark(id);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData("");
        dataResponse.setSuccess(isSuccess);
        dataResponse.setDesc("");
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteBookmark(@PathVariable(name = "id")int id ) {
        boolean isSuccess = bookmarkService.deleteBookmark(id);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData("");
        dataResponse.setSuccess(isSuccess);
        dataResponse.setDesc("");
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
