package com.example.shop_project.repository;

import com.example.shop_project.entity.SizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeRepository extends JpaRepository<SizeEntity,Integer> {
    @Query("from size as s join product_size as ps on s.id = ps.sizeId join product as p on p.id = ps.productId " +
            "where p.id = ?1 ")
    List<SizeEntity> findSizeEntitiesByProductID(int id);
}
