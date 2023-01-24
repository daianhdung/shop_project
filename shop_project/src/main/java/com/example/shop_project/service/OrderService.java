package com.example.shop_project.service;

import com.example.shop_project.dto.OrderDTO;

public interface OrderService {

    String newOrder(OrderDTO orderDTO);

    OrderDTO getOrderByToken(String token);
}
