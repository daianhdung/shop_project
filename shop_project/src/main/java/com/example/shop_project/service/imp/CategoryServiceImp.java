package com.example.shop_project.service.imp;

import com.example.shop_project.dto.CategoryDTO;
import com.example.shop_project.entity.CategoryEntity;
import com.example.shop_project.repository.CategoryRepository;
import com.example.shop_project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryServiceImp implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<CategoryDTO> getAllCategory() {
        List<CategoryDTO> list = new ArrayList<>();
        categoryRepository.findAll().forEach(categoryEntity -> {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(categoryEntity.getId());
            categoryDTO.setName(categoryEntity.getName());
            list.add(categoryDTO);
        });
        return list;
    }
}
