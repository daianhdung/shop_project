package com.example.shop_project.service;

import com.example.shop_project.dto.CouponDTO;
import com.example.shop_project.payload.request.CouponRequest;

import java.util.List;

public interface CouponService {

    CouponDTO findCouponById(int idCoupon);

    CouponDTO findCouponByName(String nameCoupon);

    List<CouponDTO> getAllCoupon();

    CouponDTO getCoupon(int id);

    boolean insertCoupon(CouponRequest couponRequest);

    boolean updateCoupon(CouponRequest couponRequest);

    boolean deleteCoupon(int id);
}
