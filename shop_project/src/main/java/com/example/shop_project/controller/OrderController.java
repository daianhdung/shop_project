package com.example.shop_project.controller;

import com.example.shop_project.dto.OrderDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping()
    public ResponseEntity<?> newOrder(@RequestBody OrderDTO orderDTO){
        boolean isSuccesInsert = orderService.newOrder(orderDTO);

        DataResponse dataResponse = new DataResponse();
        dataResponse.setSuccess(isSuccesInsert);
        dataResponse.setData(orderDTO);


        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
}
