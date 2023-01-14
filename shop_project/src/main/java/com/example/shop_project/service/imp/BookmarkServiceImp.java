package com.example.shop_project.service.imp;

import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.entity.ProductEntity;
import com.example.shop_project.model.ProductModel;
import com.example.shop_project.payload.request.FilterProductRequest;
import com.example.shop_project.repository.ProductRepository;
import com.example.shop_project.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookmarkServiceImp implements BookmarkService {
    @Autowired
    ProductRepository productRepository;
    int num;
    @Override
    public ProductDTO getProductBookMark(FilterProductRequest filterProduct, int currentPage) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        //Pageable pageable = PageRequest.of(currentPage - 1, num);
        List<ProductEntity> productEntities = productRepository.findProductEntitiesByFilter(
                "%"+ filterProduct.getSearchName() + "%",
                filterProduct.getBrandId().isEmpty() ? null : filterProduct.getBrandId(),
                filterProduct.getSizeId().isEmpty() ? null : filterProduct.getSizeId(),
                filterProduct.getCategoryId().isEmpty() ? null : filterProduct.getCategoryId(),
                email
        );

        List<ProductModel> productModels = new ArrayList<>();
        productEntities.forEach(product -> {
            ProductModel productModel = new ProductModel();
            productModel.setId(product.getId());
            productModel.setName(product.getName());
            productModel.setImage(product.getMainImage());
            productModel.setPrice(product.getPrice());
            boolean isBookMark = product.getBookmarkProducts()
                    .stream()
                    .anyMatch(bookmarkProductEntity -> bookmarkProductEntity.getUser().getEmail().equals(email));
            productModel.setBookmark(isBookMark);
            productModels.add(productModel);
        });
        ProductDTO productDTO = new ProductDTO();
        //productDTO.setTotalPage(this.getTotalPage(filterProduct));
        productDTO.setCurrentPage(currentPage);
        productDTO.setProducts(productModels);
        return productDTO;

    }

    @Override
    public boolean insertBookmark(int productId) {
        return false;
    }

    @Override
    public boolean deleteBookmark(int productId) {
        return false;
    }
}
