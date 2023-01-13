package com.example.shop_project.service;

import com.example.shop_project.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    int getTotalPage();
    int getTotalPage(int size);
    ProductDTO getProducts(int currentPage);
    ProductDTO getProductByFilter(String search, List<Integer> idsBrand, List<Integer> idsSize, List<Integer> idsCate, int current);

    List<ProductDTO> getFeaturedProductByTop1Price();
    List<ProductDTO> getProductByTop10AmountOfSold();
    ProductDTO getDetailProduct(int id);
}
