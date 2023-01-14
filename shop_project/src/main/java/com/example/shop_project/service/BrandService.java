package com.example.shop_project.service;

import com.example.shop_project.dto.BrandDTO;
import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.entity.BrandEntity;

import java.util.List;

public interface BrandService {
    List<BrandDTO> getALLBrand();

    List<BrandDTO> get5BrandHaveSmallestAmountSold();
}
