package com.example.shop_project.entity;

import com.example.shop_project.entity.id.ProductOrderId;
import com.example.shop_project.entity.id.ProductSizeId;

import javax.persistence.*;

@Entity(name = "product_order")
@IdClass(ProductOrderId.class)
public class ProductOrderEntity {
    @Id
    private int productId;
    @Id
    private int orderId;
    @Id
    private String size;
    @Column(name = "amount")
    private int amount;
    @Column(name = "price")
    private int price;
    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private ProductEntity product;
    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private OrderEntity order;

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
