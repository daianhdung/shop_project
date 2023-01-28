package com.example.shop_project.repository;

import com.example.shop_project.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {

    OrderEntity findByOrderToken(String token);

    @Query(value = "select count(o) from p_order o where month(o.date) = month(now())")
    int countNowMonth();
    @Query(value = "select count(o) from p_order o where month(o.date) = month(now()) - 1")
    int countPreviousMonth();

    @Query(value = "select count(o) from p_order o where month(o.date) = month(now()) and o.status.id = 3 ")
    int countNowMonthSold();
    @Query(value = "select count(o) from p_order o where month(o.date) = month(now()) - 1 and o.status.id = 3 ")
    int countPreviousMonthSold();

}
