package com.example.shop_project.controller.Admin;

import com.example.shop_project.dto.CategoryDTO;
import com.example.shop_project.payload.request.CateSizeRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminCategoryController {
    @Autowired
    CategoryService categoryService;


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

}
