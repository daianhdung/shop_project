package com.example.shop_project.entity;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "p_order")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "fee_ship")
    private int feeShip;
    @Column(name = "coupon")
    private float coupon;
    @Column(name = "temp_total")
    private int tempTotal;
    @Column(name = "total")
    private float total;
    @Column(name = "order_token")
    private String orderToken;
    @Column(name = "delivery_address")
    private String deliveryAddress;

    @OneToMany(mappedBy = "order")
    private Set<ProductOrderEntity> productOrders;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private UserEntity user;
    @ManyToOne
    @JoinColumn(name = "status_id")
    private StatusEntity status;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFeeShip() {
        return feeShip;
    }

    public void setFeeShip(int feeShip) {
        this.feeShip = feeShip;
    }

    public float getCoupon() {
        return coupon;
    }

    public void setCoupon(float coupon) {
        this.coupon = coupon;
    }

    public int getTempTotal() {
        return tempTotal;
    }

    public void setTempTotal(int tempTotal) {
        this.tempTotal = tempTotal;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public String getOrderToken() {
        return orderToken;
    }

    public void setOrderToken(String orderToken) {
        this.orderToken = orderToken;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public Set<ProductOrderEntity> getProductOrders() {
        return productOrders;
    }

    public void setProductOrders(Set<ProductOrderEntity> productOrders) {
        this.productOrders = productOrders;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public StatusEntity getStatus() {
        return status;
    }

    public void setStatus(StatusEntity status) {
        this.status = status;
    }


}
