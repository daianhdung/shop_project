package com.example.shop_project.service;

import com.example.shop_project.dto.CouponDTO;

import java.util.List;

public interface CouponService {

    CouponDTO findCouponById(int idCoupon);

    CouponDTO findCouponByName(String nameCoupon);

    List<CouponDTO> getAllCoupon();

    CouponDTO getCoupon();

    boolean insertCoupon();

    boolean updateCoupoN(CouponDTO couponDTO);

    boolean deleteCoupon();
}
