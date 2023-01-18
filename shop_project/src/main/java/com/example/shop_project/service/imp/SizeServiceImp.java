package com.example.shop_project.service.imp;


import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.entity.CategoryEntity;
import com.example.shop_project.entity.SizeEntity;
import com.example.shop_project.payload.request.CateSizeRequest;
import com.example.shop_project.repository.SizeRepository;
import com.example.shop_project.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SizeServiceImp implements SizeService {
    @Autowired
    SizeRepository sizeRepository;
    @Override
    public List<SizeDTO> getAllSize() {
        List<SizeDTO> list = new ArrayList<>();
        sizeRepository.findAll().forEach(sizeEntity -> {
            SizeDTO sizeDTO = new SizeDTO();
            sizeDTO.setId(sizeEntity.getId());
            sizeDTO.setName(sizeEntity.getName());
            list.add(sizeDTO);
        });
        return list;
    }

    @Override
    public List<SizeDTO> getSizeByProductId(int productId) {
        List<SizeDTO> list = new ArrayList<>();
        sizeRepository.findSizeEntitiesByProductID(productId).forEach(sizeEntity -> {
            SizeDTO sizeDTO = new SizeDTO();
            sizeDTO.setId(sizeEntity.getId());
            sizeDTO.setName(sizeEntity.getName());
            list.add(sizeDTO);
        });
        return list;
    }

    @Override
    public SizeDTO getSize(int id) {
        Optional<SizeEntity> size = sizeRepository.findById(id);
        if (size.isPresent()) {
            SizeDTO sizeDTO = new SizeDTO();
            sizeDTO.setId(size.get().getId());
            sizeDTO.setName(size.get().getName());
        }
        return null;
    }

    @Override
    public boolean insertSize(CateSizeRequest size) {
        SizeEntity categoryEntity = new SizeEntity();
        categoryEntity.setName(size.getName());
        try {
            sizeRepository.save(categoryEntity);
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateSize(CateSizeRequest size) {
        Optional<SizeEntity> sizeEntity = sizeRepository.findById(size.getId());
        if (sizeEntity.isPresent()) {
            sizeEntity.get().setName(size.getName());
        } else {
            return false;
        }
        try {
            sizeRepository.save(sizeEntity.get());
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteSize(int id) {
        try {
            sizeRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
