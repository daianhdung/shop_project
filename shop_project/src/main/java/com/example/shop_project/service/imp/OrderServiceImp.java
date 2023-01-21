package com.example.shop_project.service.imp;

import com.example.shop_project.dto.OrderDTO;
import com.example.shop_project.dto.UserDTO;
import com.example.shop_project.entity.*;
import com.example.shop_project.repository.*;
import com.example.shop_project.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductOrderRepository productOrderRepository;
    @Autowired
    StatusRepository statusRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public boolean newOrder(OrderDTO orderDTO) {
      try {
          OrderEntity order = new OrderEntity();
          order.setCoupon(orderDTO.getCoupon());
          order.setFeeShip(orderDTO.getFeeShip());
          Optional<StatusEntity> status = statusRepository.findById(2);
          order.setStatus(status.get());
          order.setTempTotal(orderDTO.getTempTotal());
          order.setDeliveryAddress(orderDTO.getDeliveryAddress());
          order.setTotal(orderDTO.getTotal());

          //If email order not found in DB so the customer not logged in, set new user anonymous in db
          UserEntity user = userRepository.findUserEntityByEmail(orderDTO.getUserDTO().getEmail());
          if(user != null){
              user.setFullName(orderDTO.getUserDTO().getFullname());
              user.setPhone(orderDTO.getUserDTO().getPhone());
              user.setAddress(orderDTO.getUserDTO().getAddress());
              order.setUser(user);
          }else {
              UserEntity userEntity = new UserEntity();
              userEntity.setEmail(orderDTO.getUserDTO().getEmail());
              userEntity.setFullName(orderDTO.getUserDTO().getFullname());
              userEntity.setPhone(orderDTO.getUserDTO().getPhone());
              userEntity.setAddress(orderDTO.getUserDTO().getAddress());
              Optional<RoleEntity> role = roleRepository.findById(3);
              userEntity.setRole(role.get());
              order.setUser(userEntity);
          }

          OrderEntity idOfOrderComplete = orderRepository.save(order);

          //Add list product order into product_order table
          orderDTO.getProductDTOList().forEach(productDTO -> {
              //get product by Id then get price to * with quantity product order
              ProductEntity productEntityOrder = productRepository.findById(productDTO.getId());
              ProductOrderEntity productOrderEntity = new ProductOrderEntity();
              productOrderEntity.setOrderId(idOfOrderComplete.getId());
              productOrderEntity.setProductId(productEntityOrder.getId());
              productOrderEntity.setAmount(productDTO.getQuantity());
              productOrderEntity.setPrice(productDTO.getQuantity() * productEntityOrder.getPrice());
              productOrderEntity.setSize("40");
              productOrderRepository.save(productOrderEntity);
          });
          return true;
      }catch (Exception e){
          System.out.println(e.getMessage());
          return false;
      }
    }
}
