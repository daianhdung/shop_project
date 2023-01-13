package com.example.shop_project.repository;

import com.example.shop_project.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Integer> {

    Optional<BrandEntity> findById(int id);
}
