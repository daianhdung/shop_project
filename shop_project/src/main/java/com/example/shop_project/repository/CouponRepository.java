package com.example.shop_project.repository;

import com.example.shop_project.entity.CouponEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<CouponEntity, Integer> {

    CouponEntity findById(int idCoupon);

    CouponEntity findByName(String name);
}
