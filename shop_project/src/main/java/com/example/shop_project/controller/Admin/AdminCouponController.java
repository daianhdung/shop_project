package com.example.shop_project.controller.Admin;

import com.example.shop_project.dto.CouponDTO;
import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.dto.ProductDetailDTO;
import com.example.shop_project.payload.request.CouponRequest;
import com.example.shop_project.payload.response.DataResponse;
import com.example.shop_project.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminCouponController {

    @Autowired
    CouponService couponService;


    @GetMapping("/coupon/get/{id}")
    public ResponseEntity<?> getCoupon(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/coupon/all")
    public ResponseEntity<?> getCoupons() {
        DataResponse dataResponse = new DataResponse();
        List<CouponDTO> couponDTOS = couponService.getAllCoupon();
        dataResponse.setDesc("getCoupons");
        dataResponse.setSuccess(true);
        dataResponse.setData(couponDTOS);
        dataResponse.setStatus(HttpStatus.OK.value());
        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/coupon/insert")
    public ResponseEntity<?> insertCoupon(@RequestBody CouponRequest couponRequest) {
        DataResponse dataResponse = new DataResponse();

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

    @PostMapping("/coupon/update")
    public ResponseEntity<?> updateCoupon(@RequestBody CouponRequest couponRequest) {
        DataResponse dataResponse = new DataResponse();

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }
    @GetMapping("/coupon/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable(name = "id") int id) {
        DataResponse dataResponse = new DataResponse();

        return new ResponseEntity<>(dataResponse, HttpStatus.OK);
    }

}
