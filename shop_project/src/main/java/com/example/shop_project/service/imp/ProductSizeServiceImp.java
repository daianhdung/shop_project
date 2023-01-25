package com.example.shop_project.service.imp;

import com.example.shop_project.dto.ProductSizeDTO;
import com.example.shop_project.repository.ProductSizeRepository;
import com.example.shop_project.service.ProductSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductSizeServiceImp implements ProductSizeService {
    @Autowired
    ProductSizeRepository productSizeRepository;

    @Override
    public Integer findAmountByProductIdAndSizeId(int productId, int sizeId) {
        int amount = productSizeRepository.findAmountByProductIdAndSizeId(productId,sizeId);
        return amount;
    }
}
