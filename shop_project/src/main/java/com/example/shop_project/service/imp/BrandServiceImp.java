package com.example.shop_project.service.imp;

import com.example.shop_project.dto.BrandDTO;
import com.example.shop_project.entity.BrandEntity;
import com.example.shop_project.repository.BrandRepository;
import com.example.shop_project.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BrandServiceImp implements BrandService {
    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<BrandDTO> getALLBrand() {
        List<BrandDTO> list = new ArrayList<>();
        brandRepository.findAll().forEach(brandEntity -> {
            BrandDTO brandDTO = new BrandDTO();
            brandDTO.setId(brandEntity.getId());
            brandDTO.setName(brandEntity.getName());
            list.add(brandDTO);
        });
        return list;
    }

    @Override
    public List<BrandDTO> get5BrandHaveSmallestAmountSold() {
        List<BrandDTO> brandDTOList = new ArrayList<>();
        List<Integer> integerList = brandRepository.getBrandHasSmallestAmountSold();
        List<BrandEntity> brandEntityList = brandRepository.findByIdIsIn(integerList);
        brandEntityList.forEach(brandEntity -> {
            BrandDTO brandDTO = new BrandDTO();
            brandDTO.setId(brandEntity.getId());
            brandDTO.setName(brandEntity.getName());
            brandDTOList.add(brandDTO);
        });
        return brandDTOList;
    }
}
