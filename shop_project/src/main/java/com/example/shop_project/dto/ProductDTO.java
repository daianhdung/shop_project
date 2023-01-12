package com.example.shop_project.dto;

import com.example.shop_project.entity.ImageProductEntity;
import com.example.shop_project.model.ProductModel;

import java.util.List;
import java.util.Set;

public class ProductDTO {
    private int id;
    private String name;
    private int price;
    private Set<ImageProductEntity> images;
    private int totalPage;
    private int currentPage;
    private List<ProductModel> products;

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public List<ProductModel> getProducts() {
        return products;
    }

    public void setProducts(List<ProductModel> products) {
        this.products = products;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Set<ImageProductEntity> getImages() {
        return images;
    }

    public void setImages(Set<ImageProductEntity> images) {
        this.images = images;
    }
}
