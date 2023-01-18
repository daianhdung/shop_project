package com.example.shop_project.service;

import com.example.shop_project.dto.CategoryDTO;
import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.dto.ProductDetailDTO;
import com.example.shop_project.payload.request.CateSizeRequest;
import com.example.shop_project.payload.request.ProductRequest;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategory();
    CategoryDTO getCategory(int id);

    boolean insertCategory(CateSizeRequest category);
    boolean updateCategory(CateSizeRequest category);
    boolean deleteCategory(int id);
}
