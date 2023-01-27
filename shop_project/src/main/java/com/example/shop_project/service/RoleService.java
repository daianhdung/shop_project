package com.example.shop_project.service;

import com.example.shop_project.dto.RoleDTO;

import java.util.List;

public interface RoleService {

    List<RoleDTO> findAllRole();

    RoleDTO getRoleByName(String name);
}
