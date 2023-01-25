package com.example.shop_project.service.imp;

import com.example.shop_project.dto.OrderDTO;
import com.example.shop_project.dto.ProductOrderDTO;
import com.example.shop_project.dto.UserDTO;
import com.example.shop_project.entity.*;
import com.example.shop_project.jwt.JwtTokenHelper;
import com.example.shop_project.repository.*;
import com.example.shop_project.service.OrderService;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    SizeRepository sizeRepository;

    @Override
    public String newOrder(OrderDTO orderDTO) {
      try {
          OrderEntity order = new OrderEntity();
          order.setCoupon(orderDTO.getCoupon());
          order.setFeeShip(orderDTO.getFeeShip());
          Optional<StatusEntity> status = statusRepository.findById(2);
          order.setStatus(status.get());
          order.setTempTotal(orderDTO.getTempTotal());
          order.setDeliveryAddress(orderDTO.getDeliveryAddress());
          order.setTotal(orderDTO.getTotal());
          String token = Encoders.BASE64.encode(orderDTO.getUserDTO().getEmail().getBytes());
          order.setOrderToken(token);

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
              productOrderEntity.setSize(String.valueOf(productDTO.getSize()));
              productOrderRepository.save(productOrderEntity);
          });
          return token;
      }catch (Exception e){
          System.out.println(e.getMessage());
          return null;
      }
    }

    @Override
    public OrderDTO getOrderByToken(String token) {
        OrderEntity order = orderRepository.findByOrderToken(token);
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setCoupon(order.getCoupon());
        orderDTO.setFeeShip(order.getFeeShip());
        orderDTO.setDeliveryAddress(order.getDeliveryAddress());
        orderDTO.setStatusId(order.getStatus().getId());
        orderDTO.setTempTotal(order.getTempTotal());
        orderDTO.setTotal((int) order.getTotal());

        Optional<UserEntity> user = userRepository.findById(order.getUser().getId());
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.get().getEmail());
        userDTO.setFullname(user.get().getFullName());
        userDTO.setAddress(user.get().getAddress());
        userDTO.setPhone(user.get().getPhone());
        orderDTO.setUserDTO(userDTO);
        orderDTO.setOrderToken(order.getOrderToken());

        List<ProductOrderEntity> productOrderEntityList = productOrderRepository.findByOrderId(order.getId());
        List<ProductOrderDTO> productOrderDTOList = new ArrayList<>();
        productOrderEntityList.forEach(productOrderEntity -> {
            ProductOrderDTO productOrderDTO = new ProductOrderDTO();
            productOrderDTO.setAmount(productOrderEntity.getAmount());

            ProductEntity productEntity = productRepository.findById(productOrderEntity.getProductId());
            productOrderDTO.setMainImage(productEntity.getMainImage());
            productOrderDTO.setPrice(productEntity.getPrice() * productOrderEntity.getAmount());
            productOrderDTO.setName(productEntity.getName());

            productOrderDTO.setSize(productOrderEntity.getSize());
            productOrderDTO.setPrice(productOrderEntity.getPrice());
            productOrderDTOList.add(productOrderDTO);
        });
        orderDTO.setProductOrderDTOList(productOrderDTOList);
        return orderDTO;
    }


}
