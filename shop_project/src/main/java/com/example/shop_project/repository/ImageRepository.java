package com.example.shop_project.repository;

import com.example.shop_project.entity.ImageProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImageProductEntity, Integer> {
    boolean deleteAllByProduct_Id(int id);
}
