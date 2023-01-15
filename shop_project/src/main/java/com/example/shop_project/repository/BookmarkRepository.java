package com.example.shop_project.repository;

import com.example.shop_project.entity.BookmarkProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<BookmarkProductEntity, Integer> {
}
