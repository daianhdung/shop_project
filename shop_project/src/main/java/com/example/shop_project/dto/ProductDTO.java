package com.example.shop_project.dto;

import com.example.shop_project.model.ProductModel;

import java.util.List;

public class ProductDTO {
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
}
