package com.example.shop_project.entity.id;

import javax.persistence.Column;
import java.io.Serializable;

public class ProductOrderId implements Serializable {
    @Column(name = "order_id")
    private int orderId;
    @Column(name = "product_id")
    private int productId;
    @Column(name = "size")
    private String size;

    public ProductOrderId(int orderId, int productId, String size) {
        this.orderId = orderId;
        this.productId = productId;
        this.size = size;
    }

    public ProductOrderId() {
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }
}
