package com.example.shop_project.service.imp;

import com.example.shop_project.dto.CouponDTO;
import com.example.shop_project.entity.CouponEntity;
import com.example.shop_project.repository.CouponRepository;
import com.example.shop_project.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CouponServiceImp implements CouponService {

    @Autowired
    CouponRepository couponRepository;

    @Override
    public CouponDTO findCouponById(int idCoupon) {
        CouponDTO couponDTO = new CouponDTO();
        CouponEntity couponEntity = couponRepository.findById(idCoupon);
        couponDTO.setId(couponEntity.getId());
        couponDTO.setName(couponEntity.getName());
        couponDTO.setRate(couponEntity.getRate());
        return couponDTO;
    }

    @Override
    public CouponDTO findCouponByName(String nameCoupon) {
        CouponDTO couponDTO = new CouponDTO();
        Optional<CouponEntity> couponEntity = Optional.ofNullable(couponRepository.findByName(nameCoupon));
        if(couponEntity.isPresent()){
            couponDTO.setId(couponEntity.get().getId());
            couponDTO.setName(couponEntity.get().getName());
            couponDTO.setRate(couponEntity.get().getRate());
            return couponDTO;
        }else{
            return couponDTO;
        }
    }
}
