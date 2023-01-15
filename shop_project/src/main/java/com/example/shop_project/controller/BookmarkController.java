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
public class BookmarkController {

    @Autowired
    BookmarkService bookmarkService;
    @PostMapping("/{current}")
    public ResponseEntity<?> getProductWithPageByFilter(@PathVariable(name = "current") int current,
                                                        @RequestBody FilterProductRequest filterProduct) {
        ProductDTO productDTO = bookmarkService.getProductBookMark(filterProduct, current);
        DataResponse dataResponse = new DataResponse();
        dataResponse.setData(productDTO);
        dataResponse.setSuccess(true);
        dataResponse.setDesc("get product with current page by filter");
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
