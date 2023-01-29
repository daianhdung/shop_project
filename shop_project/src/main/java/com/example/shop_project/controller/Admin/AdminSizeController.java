package com.example.shop_project.controller.Admin;

import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.payload.request.CateSizeRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminSizeController {

    @Autowired
    SizeService sizeService;

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
