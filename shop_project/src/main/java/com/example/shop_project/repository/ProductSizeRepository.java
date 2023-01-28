package com.example.shop_project.repository;

import com.example.shop_project.entity.ProductEntity;
import com.example.shop_project.entity.ProductSizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSizeEntity, Integer> {

    @Query(value = "select amount from product_size WHERE product_id = ?1 AND size_id = ?2", nativeQuery = true)
    Integer findAmountByProductIdAndSizeId(int productId, int sizeId);

    @Query(value = "select sum(ps.amount) from product_size ps")
    int sumProductAmount();

}
