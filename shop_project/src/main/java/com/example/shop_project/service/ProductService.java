package com.example.shop_project.service;

import com.example.shop_project.dto.ProductDTO;

public interface ProductService {
    int getTotalPage();
    ProductDTO getProducts(int currentPage);
    void test();
}
