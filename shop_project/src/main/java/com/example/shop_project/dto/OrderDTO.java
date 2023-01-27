package com.example.shop_project.dto;

import com.example.shop_project.entity.ProductEntity;
import com.example.shop_project.entity.UserEntity;

import java.util.List;
import java.util.Map;

public class OrderDTO {

    private UserDTO userDTO;

    private List<ProductDTO> productDTOList;
    private List<Map<String,String>> products;

    private float coupon;

    private String deliveryAddress;

    private int id;
    private int tempTotal;
    private int total;
    private int feeShip;

    private int statusId;
    private String status;

    private String orderToken;

    public String getOrderToken() {
        return orderToken;
    }

    public void setOrderToken(String orderToken) {
        this.orderToken = orderToken;
    }

    private List<ProductOrderDTO> productOrderDTOList;

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

    public List<ProductOrderDTO> getProductOrderDTOList() {
        return productOrderDTOList;
    }

    public void setProductOrderDTOList(List<ProductOrderDTO> productOrderDTOList) {
        this.productOrderDTOList = productOrderDTOList;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Map<String, String>> getProducts() {
        return products;
    }

    public void setProducts(List<Map<String, String>> products) {
        this.products = products;
    }
}
