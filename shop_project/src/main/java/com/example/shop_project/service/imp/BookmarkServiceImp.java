package com.example.shop_project.service.imp;

import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.entity.BookmarkProductEntity;
import com.example.shop_project.entity.ProductEntity;
import com.example.shop_project.entity.UserEntity;
import com.example.shop_project.model.ProductModel;
import com.example.shop_project.payload.request.FilterProductRequest;
import com.example.shop_project.repository.BookmarkRepository;
import com.example.shop_project.repository.ProductRepository;
import com.example.shop_project.repository.UserRepository;
import com.example.shop_project.service.BookmarkService;
import com.example.shop_project.utils.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookmarkServiceImp implements BookmarkService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BookmarkRepository bookmarkRepository;
    int num = 9;
    @Override
    public int getTotalPage(FilterProductRequest filterProduct) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        int size = productRepository.findProductEntitiesByFilter("%"+ filterProduct.getSearchName() + "%",
                filterProduct.getBrandId().isEmpty() ? null : filterProduct.getBrandId(),
                filterProduct.getSizeId().isEmpty() ? null : filterProduct.getSizeId(),
                filterProduct.getCategoryId().isEmpty() ? null : filterProduct.getCategoryId(),
                email).size();
        int totalPage = 0;
        if (size % num == 0) {
            totalPage = size / num;
        } else {
            totalPage = size / num + 1;
        }
        return totalPage;
    }
    @Override
    public ProductDTO getProductBookMark(FilterProductRequest filterProduct, int currentPage) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Pageable pageable = null;
        if (filterProduct.getSort().equals("az"))  {
            pageable = PageRequest.of(currentPage - 1, num, Sort.by("name").ascending());
        } else if (filterProduct.getSort().equals("asc")){
            pageable = PageRequest.of(currentPage - 1, num, Sort.by("price").ascending());
        } else if (filterProduct.getSort().equals("dsc")) {
            pageable = PageRequest.of(currentPage - 1, num, Sort.by("price").descending());
        }
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
            productModel.setImage(Url.Image.getPath() + product.getMainImage());
            productModel.setPrice(product.getPrice());
            boolean isBookMark = product.getBookmarkProducts()
                    .stream()
                    .anyMatch(bookmarkProductEntity -> bookmarkProductEntity.getUser().getEmail().equals(email));
            productModel.setBookmark(isBookMark);
            productModels.add(productModel);
        });
        ProductDTO productDTO = new ProductDTO();
        productDTO.setTotalPage(this.getTotalPage(filterProduct));
        productDTO.setCurrentPage(currentPage);
        productDTO.setProducts(productModels);
        return productDTO;
    }

    @Override
    public boolean insertBookmark(int productId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        UserEntity user = userRepository.findUserEntityByEmail(email);
        ProductEntity product = productRepository.findById(productId);
        BookmarkProductEntity bookmarkProduct = new BookmarkProductEntity();


        return false;
    }

    @Override
    public boolean deleteBookmark(int productId) {
        return false;
    }
}
