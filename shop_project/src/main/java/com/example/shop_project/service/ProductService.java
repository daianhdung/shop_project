package com.example.shop_project.service;

import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.dto.ProductDetailDTO;
import com.example.shop_project.payload.request.FilterProductRequest;
import com.example.shop_project.payload.request.ProductRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    int getTotalPage(FilterProductRequest filterProduct);


    ProductDTO getProductByFilter(FilterProductRequest filterProduct);
    ProductDTO getProducts();
    ProductDetailDTO getProduct(int id) ;
    boolean insertProduct(ProductRequest product, MultipartFile file, MultipartFile[] multiFile);

    boolean updateProduct(ProductRequest product, MultipartFile file, MultipartFile[] multiFile);
    boolean deleteProduct(int id);
    List<ProductDTO> getFeaturedProductByTop1Price();
    List<ProductDTO> getProductByTop10AmountOfSold();
    ProductDTO getDetailProduct(int id);

    List<ProductDTO> searchProduct(String name);
    List<ProductDTO> searchProductByBrandId(int brandId);
    List<ProductDTO> searchProductByCategoryId(int categoryId);
}
