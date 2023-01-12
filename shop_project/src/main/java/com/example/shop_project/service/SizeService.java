package com.example.shop_project.service;

import com.example.shop_project.dto.SizeDTO;

import java.util.List;

public interface SizeService {
    List<SizeDTO> getAllSize();
    List<SizeDTO> getSizeByProductId(int productId);
}
