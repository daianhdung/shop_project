package com.example.shop_project.repository;

import com.example.shop_project.entity.ProductEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
//    @Query("from product as p order by p.id asc")
//    List<ProductEntity> findAll();

    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "where p.name like ?1 and (p.brand.id in ?2 or ?2 is null) and (ps.sizeId in ?3 or ?3 is null) and (p.category.id in ?4 or ?4 is null )" +
            " group by p.id order by p.id asc ")
    List<ProductEntity> findProductEntitiesByFilter(String name,
                                                    Iterable<Integer> idsBrand,
                                                    Iterable<Integer> idsSize,
                                                    Iterable<Integer> idsCate,
                                                    Pageable pageable);
    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "where p.name like ?1 and (p.brand.id in ?2 or ?2 is null) and (ps.sizeId in ?3 or ?3 is null) and (p.category.id in ?4 or ?4 is null )" +
            " group by p.id order by p.id asc ")
    List<ProductEntity> findProductEntitiesByFilter(String name,
                                                    Iterable<Integer> idsBrand,
                                                    Iterable<Integer> idsSize,
                                                    Iterable<Integer> idsCate);
    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "join bookmark_product as bp on p.id = bp.productId join user as u on u.id = bp.userId " +
            "where p.name like ?1 and (p.brand.id in ?2 or ?2 is null) and (ps.sizeId in ?3 or ?3 is null) and (p.category.id in ?4 or ?4 is null) " +
            "and u.email = ?5 " +
            "group by p.id order by p.id asc ")
    List<ProductEntity> findProductEntitiesByFilter(String name,
                                                    Iterable<Integer> idsBrand,
                                                    Iterable<Integer> idsSize,
                                                    Iterable<Integer> idsCate,
                                                    String email,
                                                    Pageable pageable);
    @Query("select p from product as p join product_size as ps on p.id = ps.productId join size as s on ps.sizeId = s.id " +
            "join bookmark_product as bp on p.id = bp.productId join user as u on u.id = bp.userId " +
            "where p.name like ?1 and (p.brand.id in ?2 or ?2 is null) and (ps.sizeId in ?3 or ?3 is null) and (p.category.id in ?4 or ?4 is null) " +
            "and u.email = ?5 " +
            "group by p.id order by p.id asc ")
    List<ProductEntity> findProductEntitiesByFilter(String name,
                                                    Iterable<Integer> idsBrand,
                                                    Iterable<Integer> idsSize,
                                                    Iterable<Integer> idsCate,
                                                    String email);
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
