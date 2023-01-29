package com.example.shop_project.service.imp;

import com.example.shop_project.dto.CouponDTO;
import com.example.shop_project.entity.CouponEntity;
import com.example.shop_project.payload.request.CouponRequest;
import com.example.shop_project.repository.CouponRepository;
import com.example.shop_project.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

    @Override
    public List<CouponDTO> getAllCoupon() {
        List<CouponDTO> couponDTOS = new ArrayList<>();
        List<CouponEntity> couponEntities = couponRepository.findAll();
        couponEntities.forEach( couponEntity -> {
            CouponDTO couponDTO = new CouponDTO();
            couponDTO.setId(couponEntity.getId());
            couponDTO.setName(couponEntity.getName());
            couponDTO.setRate(couponEntity.getRate());
            couponDTOS.add(couponDTO);
        });

        return couponDTOS;
    }
    @Override
    public CouponDTO getCoupon(int id) {
        CouponEntity couponEntity = couponRepository.findById(id);
        CouponDTO couponDTO = new CouponDTO();
        couponDTO.setId(couponEntity.getId());
        couponDTO.setName(couponEntity.getName());
        couponDTO.setRate(couponEntity.getRate());
        return couponDTO;
    }
    @Override
    public boolean insertCoupon(CouponRequest couponRequest) {
        CouponEntity couponEntity = new CouponEntity();

        couponEntity.setName(couponRequest.getName());
        couponEntity.setRate((couponRequest.getRate()));
        try {
            couponRepository.save(couponEntity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateCoupon(CouponRequest couponRequest) {
        CouponEntity couponEntity = couponRepository.findById(couponRequest.getId());
        couponEntity.setName(couponRequest.getName());
        couponEntity.setRate((couponRequest.getRate()));
        try {
            couponRepository.save(couponEntity);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteCoupon(int id) {
        try {
            couponRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
