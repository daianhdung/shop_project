package com.example.shop_project.controller.Admin;

import com.example.shop_project.dto.OrderDTO;
import com.example.shop_project.dto.StatusDTO;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.repository.OrderRepository;
import com.example.shop_project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public class AdminOrderController {

    @Autowired
    OrderService orderService;



    @GetMapping("/order/get/{id}")
    public ResponseEntity<?> getOrder(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();
        OrderDTO orderDTO = orderService.getOrder(id);
        dataResponse.setDesc("get order");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(orderDTO != null);
        dataResponse.setData(orderDTO);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/order/all")
    public ResponseEntity<?> getAllOrder() {
        DataResponse dataResponse = new DataResponse();
        List<OrderDTO> orderDTOS = orderService.getAllOrder();
        dataResponse.setDesc("getAllOrder");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(orderDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/order/updatestatus/{id}/{status}")
    public ResponseEntity<?> updateStatusOrder(@PathVariable(name = "id") int id, @PathVariable(name = "status") int status) {
        DataResponse dataResponse = new DataResponse();
        boolean isSuccess = orderService.updateStatusOrder(id, status);
        dataResponse.setDesc("updateStatusOrder");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(isSuccess);
        dataResponse.setData("");
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @GetMapping("/status/all")
    public ResponseEntity<?> getAllStatus() {
        DataResponse dataResponse = new DataResponse();
        List<StatusDTO> statusDTOS = orderService.getAllStatus();
        dataResponse.setDesc("getAllStatus");
        dataResponse.setStatus(HttpStatus.OK.value());
        dataResponse.setSuccess(true);
        dataResponse.setData(statusDTOS);
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
