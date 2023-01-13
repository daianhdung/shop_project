package com.example.shop_project.service.imp;


import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.entity.ProductEntity;
import com.example.shop_project.model.ProductModel;
import com.example.shop_project.repository.ProductRepository;
import com.example.shop_project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    ProductRepository productRepository;
    private int num = 9;

    @Override
    public int getTotalPage() {
        int size = productRepository.findAll().size();
        int totalPage = 0;
        if (size % num == 0) {
            totalPage = size / num;
        } else {
            totalPage = size / num + 1;
        }
        return totalPage;
    }
    @Override
    public int getTotalPage(int size) {
        int totalPage = 0;
        if (size % num == 0) {
            totalPage = size / num;
        } else {
            totalPage = size / num + 1;
        }
        return totalPage;
    }

    @Override
    public ProductDTO getProducts(int currentPage) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Pageable pageable = PageRequest.of(currentPage, num);
        Page<ProductEntity> productEntityPage = productRepository.findAll(pageable);
        List<ProductEntity> productEntities = productEntityPage.getContent();
        List<ProductModel> productModels = new ArrayList<>();
        productEntities.forEach(product -> {
            ProductModel productModel = new ProductModel();
            productModel.setId(product.getId());
            productModel.setName(product.getName());
            productModel.setImage(product.getImage());
            productModel.setPrice(product.getPrice());
            boolean isBookMark = product.getBookmarkProducts()
                    .stream()
                    .anyMatch(bookmarkProductEntity -> bookmarkProductEntity.getUser().getEmail().equals(email));
            productModel.setBookmark(isBookMark);
            productModels.add(productModel);
        });
        ProductDTO productDTO = new ProductDTO();
        productDTO.setTotalPage(this.getTotalPage(productEntities.size()));
        productDTO.setCurrentPage(currentPage);
        productDTO.setProducts(productModels);

        return productDTO;
    }

    @Override
    public ProductDTO getProductByFilter(String search, List<Integer> idsBrand, List<Integer> idsSize, List<Integer> idsCate,
                                         int currentPage) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Pageable pageable = PageRequest.of(currentPage, num);
        Page<ProductEntity> productEntityPage = productRepository.findProductEntitiesByFilter(search, idsBrand, idsSize, idsCate,pageable);
        //List<ProductEntity> productEntities = productEntityPage.getContent();

        List<ProductEntity> productEntities = productRepository.findProductEntitiesByFilter(search, idsBrand, idsSize, idsSize);


        List<ProductModel> productModels = new ArrayList<>();
        productEntities.forEach(product -> {
            ProductModel productModel = new ProductModel();
            productModel.setId(product.getId());
            productModel.setName(product.getName());
            productModel.setImage(product.getImage());
            productModel.setPrice(product.getPrice());
            boolean isBookMark = product.getBookmarkProducts()
                    .stream()
                    .anyMatch(bookmarkProductEntity -> bookmarkProductEntity.getUser().getEmail().equals(email));
            productModel.setBookmark(isBookMark);
            productModels.add(productModel);
        });
        ProductDTO productDTO = new ProductDTO();
        productDTO.setTotalPage(this.getTotalPage(productEntities.size()));
        productDTO.setCurrentPage(currentPage);
        productDTO.setProducts(productModels);

        return productDTO;

    }

    @Override
    public List<ProductDTO> getFeaturedProductByTop1Price() {
        List<Integer> listPrice = productRepository.findMaxPricePerBrand();
        List<ProductDTO> productDTOList = new ArrayList<>();
        List<ProductEntity> productEntityList = productRepository.findAllByPriceIsIn(listPrice);
        productEntityList.forEach(productEntity -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(productEntity.getId());
            productDTO.setName(productEntity.getName());
            productDTO.setPrice(productEntity.getPrice());
            productDTOList.add(productDTO);
        });
        return productDTOList;
    }

    @Override
    public List<ProductDTO> getProductByTop10AmountOfSold() {
        List<ProductDTO> productDTOList = new ArrayList<>();
        List<ProductEntity> productEntityList = productRepository.findByTop10Product();
        productEntityList.forEach(productEntity -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(productEntity.getId());
            productDTO.setName(productEntity.getName());
            productDTO.setPrice(productEntity.getPrice());
            productDTOList.add(productDTO);
        });
        return productDTOList;
    }


}
