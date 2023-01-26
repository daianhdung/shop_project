package com.example.shop_project.repository;

import com.example.shop_project.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    List<UserEntity> findByEmail(String email);
    UserEntity findUserEntityByEmail(String email);

    List<UserEntity> findAll();
}
