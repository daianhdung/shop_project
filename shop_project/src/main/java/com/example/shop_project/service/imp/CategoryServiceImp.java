package com.example.shop_project.service.imp;

import com.example.shop_project.dto.CategoryDTO;
import com.example.shop_project.entity.CategoryEntity;
import com.example.shop_project.entity.ProductEntity;
import com.example.shop_project.payload.request.CateSizeRequest;
import com.example.shop_project.repository.CategoryRepository;
import com.example.shop_project.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public CategoryDTO getCategory(int id) {
        Optional<CategoryEntity> categoryEntity = categoryRepository.findById(id);
        if (categoryEntity.isPresent()) {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(categoryEntity.get().getId());
            categoryDTO.setName(categoryEntity.get().getName());
            return categoryDTO;
        } else {
            return null;
        }
    }

    @Override
    public boolean insertCategory(CateSizeRequest category) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setName(category.getName());
        try {
            categoryRepository.save(categoryEntity);
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateCategory(CateSizeRequest category) {
        Optional<CategoryEntity> categoryEntity = categoryRepository.findById(category.getId());
        if (categoryEntity.isPresent()) {
            categoryEntity.get().setName(category.getName());
        } else {
            return false;
        }
        try {
            categoryRepository.save(categoryEntity.get());
            return true;
        }catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteCategory(int id) {
        try {
            categoryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
