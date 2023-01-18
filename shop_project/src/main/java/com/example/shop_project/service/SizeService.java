package com.example.shop_project.service;

import com.example.shop_project.dto.CategoryDTO;
import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.payload.request.CateSizeRequest;

import java.util.List;

public interface SizeService {
    List<SizeDTO> getAllSize();
    List<SizeDTO> getSizeByProductId(int productId);
    SizeDTO getSize(int id);
    boolean insertSize(CateSizeRequest size);
    boolean updateSize(CateSizeRequest size);
    boolean deleteSize(int id);
}
