package com.example.shop_project.dto;

import com.example.shop_project.entity.ProductEntity;
import com.example.shop_project.entity.UserEntity;

import java.util.List;

public class OrderDTO {

    private UserDTO userDTO;

    private List<ProductDTO> productDTOList;

    private float coupon;

    private String deliveryAddress;

    private int id;
    private int tempTotal;
    private int total;
    private int feeShip;

    private int statusId;



    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }


    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public List<ProductDTO> getProductDTOList() {
        return productDTOList;
    }

    public void setProductDTOList(List<ProductDTO> productDTOList) {
        this.productDTOList = productDTOList;
    }

    public float getCoupon() {
        return coupon;
    }

    public void setCoupon(float coupon) {
        this.coupon = coupon;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTempTotal() {
        return tempTotal;
    }

    public void setTempTotal(int tempTotal) {
        this.tempTotal = tempTotal;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getFeeShip() {
        return feeShip;
    }

    public void setFeeShip(int feeShip) {
        this.feeShip = feeShip;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }
}
