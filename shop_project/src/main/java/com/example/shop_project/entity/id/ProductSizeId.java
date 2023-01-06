package com.example.shop_project.entity.id;

import javax.persistence.Column;
import java.io.Serializable;

public class ProductSizeId implements Serializable {
    @Column(name = "product_id")
    private int productId;
    @Column(name = "size_id")
    private int sizeId;

    public ProductSizeId(int productId, int sizeId) {
        this.productId = productId;
        this.sizeId = sizeId;
    }

    public ProductSizeId() {
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getSizeId() {
        return sizeId;
    }

    public void setSizeId(int sizeId) {
        this.sizeId = sizeId;
    }
}
