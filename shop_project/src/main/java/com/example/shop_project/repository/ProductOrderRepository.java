package com.example.shop_project.repository;

import com.example.shop_project.entity.ProductOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductOrderRepository extends JpaRepository<ProductOrderEntity, Integer> {

    List<ProductOrderEntity> findByOrderId(int id);
}
