package com.example.shop_project.repository;

import com.example.shop_project.entity.ProductEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
//    @Query("from product as p order by p.id asc")
//    List<ProductEntity> findAll();

    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "where p.name like (:name) and (( (:isBrand) = true) or (p.brand.id in (:idsBrand))) and (((:isSize) = true) or (ps.sizeId in (:idsSize))) and (((:isCate) = true) or (p.category.id in (:idsCate)))" +
            " group by p.id")
    List<ProductEntity> findProductEntitiesByFilter(@Param("name") String name,
                                                    @Param("isBrand")boolean isBrand,
                                                    @Param("idsBrand")Iterable<Integer> idsBrand,
                                                    @Param("isSize")boolean isSize,
                                                    @Param("idsSize")Iterable<Integer> idsSize,
                                                    @Param("isCate")boolean isCate,
                                                    @Param("idsCate")Iterable<Integer> idsCate,
                                                    Pageable pageable);
    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "where p.name like (:name) and (( (:isBrand) = true) or (p.brand.id in (:idsBrand))) and (((:isSize) = true) or (ps.sizeId in (:idsSize))) and (((:isCate) = true) or (p.category.id in (:idsCate)))" +
            " group by p.id")
    List<ProductEntity> findProductEntitiesByFilter(@Param("name") String name,
                                                    @Param("isBrand")boolean isBrand,
                                                    @Param("idsBrand")Iterable<Integer> idsBrand,
                                                    @Param("isSize")boolean isSize,
                                                    @Param("idsSize")Iterable<Integer> idsSize,
                                                    @Param("isCate")boolean isCate,
                                                    @Param("idsCate")Iterable<Integer> idsCate);
    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "join bookmark_product as bp on p.id = bp.productId join user as u on u.id = bp.userId " +
            "where p.name like (:name) and (( (:isBrand) = true) or (p.brand.id in (:idsBrand))) and (((:isSize) = true) or (ps.sizeId in (:idsSize))) and (((:isCate) = true) or (p.category.id in (:idsCate))) " +
            "and u.email = :email " +
            "group by p.id")
    List<ProductEntity> findProductEntitiesByFilter(@Param("name") String name,
                                                    @Param("isBrand")boolean isBrand,
                                                    @Param("idsBrand")Iterable<Integer> idsBrand,
                                                    @Param("isSize")boolean isSize,
                                                    @Param("idsSize")Iterable<Integer> idsSize,
                                                    @Param("isCate")boolean isCate,
                                                    @Param("idsCate")Iterable<Integer> idsCate,
                                                    @Param("email") String email,
                                                    Pageable pageable);
    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "join bookmark_product as bp on p.id = bp.productId join user as u on u.id = bp.userId " +
            "where p.name like (:name) and (( (:isBrand) = true) or (p.brand.id in (:idsBrand))) and (((:isSize) = true) or (ps.sizeId in (:idsSize))) and (((:isCate) = true) or (p.category.id in (:idsCate))) " +
            "and u.email = :email " +
            "group by p.id")
    List<ProductEntity> findProductEntitiesByFilter(@Param("name") String name,
                                                    @Param("isBrand")boolean isBrand,
                                                    @Param("idsBrand")Iterable<Integer> idsBrand,
                                                    @Param("isSize")boolean isSize,
                                                    @Param("idsSize")Iterable<Integer> idsSize,
                                                    @Param("isCate")boolean isCate,
                                                    @Param("idsCate")Iterable<Integer> idsCate,
                                                    @Param("email") String email);
    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id group by p.id")
    List<ProductEntity> findProductEntities();

    @Query(value = "SELECT MAX(price) from product GROUP BY brand_id", nativeQuery = true)
    List<Integer> findMaxPricePerBrand();

    List<ProductEntity> findAllByPriceIsIn(List<Integer> listPrice);

    @Query(value = "SELECT * from product ORDER BY amount_of_sold DESC LIMIT 10", nativeQuery = true)
    List<ProductEntity> findByTop10Product();

    ProductEntity findById(int id);

    @Query(value = "SELECT * FROM product WHERE name LIKE ?1 LIMIT 5", nativeQuery = true)
    List<ProductEntity> findByKeyword(String name);

    List<ProductEntity> findAllByBrandId(int brandId);
    List<ProductEntity> findAllByCategoryId(int categoryId);

}
