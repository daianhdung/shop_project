package com.example.shop_project.repository;

import com.example.shop_project.entity.ProductEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
//    @Query("from product as p order by p.id asc")
//    List<ProductEntity> findAll();

    @Query(value = "SELECT MAX(price) from product GROUP BY brand_id", nativeQuery = true)
    List<Integer> findMaxPricePerBrand();

    List<ProductEntity> findAllByPriceIsIn(List<Integer> listPrice);

    @Query(value = "SELECT * from product GROUP BY brand_id", nativeQuery = true)
    List<ProductEntity> findByTop10Product();

}
