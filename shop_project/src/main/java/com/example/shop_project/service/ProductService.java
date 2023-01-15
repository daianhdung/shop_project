package com.example.shop_project.service;

import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.payload.request.FilterProductRequest;

import java.util.List;

public interface ProductService {
    int getTotalPage(FilterProductRequest filterProduct);

    int getTotalPage();

    ProductDTO getProducts(int currentPage);
    ProductDTO getProductByFilter(FilterProductRequest filterProduct, int currentPage);

    List<ProductDTO> getFeaturedProductByTop1Price();
    List<ProductDTO> getProductByTop10AmountOfSold();
    ProductDTO getDetailProduct(int id);

    List<ProductDTO> searchProduct(String name);
    List<ProductDTO> searchProductByBrandId(int brandId);
    List<ProductDTO> searchProductByCategoryId(int categoryId);
}
