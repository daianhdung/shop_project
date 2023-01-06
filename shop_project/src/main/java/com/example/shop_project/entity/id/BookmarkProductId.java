package com.example.shop_project.entity.id;


import javax.persistence.Column;
import java.io.Serializable;

public class BookmarkProductId implements Serializable {
    @Column(name = "user_id")
    private int userId;
    @Column(name = "product_id")
    private int productId;

    public BookmarkProductId(int userId, int productId) {
        this.userId = userId;
        this.productId = productId;
    }

    public BookmarkProductId() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }
}
