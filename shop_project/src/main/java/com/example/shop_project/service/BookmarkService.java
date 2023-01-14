package com.example.shop_project.service;

import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.payload.request.FilterProductRequest;

public interface BookmarkService {
    ProductDTO getProductBookMark(FilterProductRequest filterProduct, int currentPage);
    boolean insertBookmark(int productId);
    boolean deleteBookmark(int productId);
}
