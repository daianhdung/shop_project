package com.example.shop_project.service;

import com.example.shop_project.dto.CouponDTO;

public interface CouponService {

    CouponDTO findCouponById(int idCoupon);

    CouponDTO findCouponByName(String nameCoupon);
}
