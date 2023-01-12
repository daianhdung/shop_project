package com.example.shop_project.service.imp;


import com.example.shop_project.dto.SizeDTO;
import com.example.shop_project.entity.SizeEntity;
import com.example.shop_project.repository.SizeRepository;
import com.example.shop_project.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
}
