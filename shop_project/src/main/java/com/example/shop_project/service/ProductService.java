package com.example.shop_project.service;

import com.example.shop_project.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    int getTotalPage();
    ProductDTO getProducts(int currentPage);

    List<ProductDTO> getFeaturedProductByTop1Price();
    List<ProductDTO> getProductByTop10AmountOfSold();
}
