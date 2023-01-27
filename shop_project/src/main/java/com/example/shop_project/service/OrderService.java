package com.example.shop_project.service;

import com.example.shop_project.dto.OrderDTO;
import com.example.shop_project.dto.StatusDTO;

import java.util.List;

public interface OrderService {

    String newOrder(OrderDTO orderDTO);

    OrderDTO getOrderByToken(String token);

    List<OrderDTO> getAllOrder();
    OrderDTO getOrder(int id);
    boolean updateStatusOrder(int id, int statusId);
    List<StatusDTO> getAllStatus();


}
