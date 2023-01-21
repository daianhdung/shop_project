package com.example.shop_project.service;

import com.example.shop_project.dto.OrderDTO;

public interface OrderService {

    boolean newOrder(OrderDTO orderDTO);
}
