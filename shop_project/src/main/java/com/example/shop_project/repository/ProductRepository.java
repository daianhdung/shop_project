package com.example.shop_project.repository;

import com.example.shop_project.entity.ProductEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
//    @Query("from product as p order by p.id asc")
//    List<ProductEntity> findAll();

    @Query("from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "where p.name like ?1 and p.brand.id in ?2 and s.id in ?3 and p.category.id in ?4")
    List<ProductEntity> findProductEntitiesByFilter(String name,
                                                    Iterable<Integer> idsBrand,
                                                    Iterable<Integer> idsSize,
                                                    Iterable<Integer> idsCate );

    @Query(value = "SELECT MAX(price) from product GROUP BY brand_id", nativeQuery = true)
    List<Integer> findMaxPricePerBrand();

    List<ProductEntity> findAllByPriceIsIn(List<Integer> listPrice);

    @Query(value = "SELECT * from product GROUP BY brand_id", nativeQuery = true)
    List<ProductEntity> findByTop10Product();

}
