package com.example.shop_project.service;

import com.example.shop_project.dto.ProductSizeDTO;

public interface ProductSizeService {

    Integer findAmountByProductIdAndSizeId(int productId, int sizeId);
}
