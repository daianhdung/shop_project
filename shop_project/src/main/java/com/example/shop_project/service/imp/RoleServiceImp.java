package com.example.shop_project.service.imp;

import com.example.shop_project.dto.RoleDTO;
import com.example.shop_project.entity.RoleEntity;
import com.example.shop_project.repository.RoleRepository;
import com.example.shop_project.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImp implements RoleService {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<RoleDTO> findAllRole() {
        List<RoleDTO> roleDTOList = new ArrayList<>();
        List<RoleEntity> roleEntityList = roleRepository.findAll();
        roleEntityList.forEach(roleEntity -> {
            RoleDTO roleDTO = new RoleDTO();
            roleDTO.setName(roleEntity.getName());
            roleDTO.setId(roleEntity.getId());
            roleDTOList.add(roleDTO);
        });
        return roleDTOList;
    }

    @Override
    public RoleDTO getRoleByName(String name) {
        RoleDTO roleDTO = new RoleDTO();
        RoleEntity roleEntity = roleRepository.findByName(name);
        roleDTO.setId(roleEntity.getId());
        roleDTO.setName(roleEntity.getName());
        roleDTO.setDescription(roleEntity.getDescription());
        return roleDTO;
    }
}
