package com.example.shop_project.repository;

import com.example.shop_project.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Integer> {

    Optional<BrandEntity> findById(int id);


    @Query(value = "SELECT distinct(b.id), amount_of_sold FROM brand b " +
            "LEFT JOIN product p ON b.id = p.brand_id " +
            "WHERE amount_of_sold IS NOT NULL ORDER BY amount_of_sold LIMIT 5", nativeQuery = true)
    List<Integer> getBrandHasSmallestAmountSold();

    List<BrandEntity> findByIdIsIn(List<Integer> integerList);
}
