package com.example.shop_project.service.imp;


import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.entity.BrandEntity;
import com.example.shop_project.entity.ImageProductEntity;
import com.example.shop_project.entity.ProductEntity;
import com.example.shop_project.model.ProductModel;
import com.example.shop_project.payload.request.FilterProductRequest;
import com.example.shop_project.repository.BrandRepository;
import com.example.shop_project.repository.ProductRepository;
import com.example.shop_project.service.ProductService;
import com.example.shop_project.utils.StringUtil;
import com.example.shop_project.utils.Url;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    BrandRepository brandRepository;

    @Autowired
    StringUtil stringUtil;
    private int num = 9;

    @Override
    public int getTotalPage(FilterProductRequest filterProduct) {
        int size = productRepository.findProductEntitiesByFilter("%"+ filterProduct.getSearchName() + "%",
                filterProduct.getBrandId().isEmpty() ? null : filterProduct.getBrandId(),
                filterProduct.getSizeId().isEmpty() ? null : filterProduct.getSizeId(),
                filterProduct.getCategoryId().isEmpty() ? null : filterProduct.getCategoryId()).size();
        int totalPage = 0;
        if (size % num == 0) {
            totalPage = size / num;
        } else {
            totalPage = size / num + 1;
        }

        return totalPage;
    }
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
            productModel.setImage(product.getMainImage());
            productModel.setPrice(product.getPrice());
            boolean isBookMark = product.getBookmarkProducts()
                    .stream()
                    .anyMatch(bookmarkProductEntity -> bookmarkProductEntity.getUser().getEmail().equals(email));
            productModel.setBookmark(isBookMark);
            productModels.add(productModel);
        });
        ProductDTO productDTO = new ProductDTO();
        productDTO.setTotalPage(productEntityPage.getTotalPages());
        productDTO.setCurrentPage(currentPage);
        productDTO.setProducts(productModels);

        return productDTO;
    }

    @Override
    public ProductDTO getProductByFilter(FilterProductRequest filterProduct) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        System.out.println("email" + email);
        Pageable pageable = null;
        if (filterProduct.getSort().equals("az"))  {
            pageable = PageRequest.of(filterProduct.getCurrent() - 1, num, Sort.by("name").ascending());
        } else if (filterProduct.getSort().equals("asc")){
            pageable = PageRequest.of(filterProduct.getCurrent() - 1, num, Sort.by("price").ascending());
        } else if (filterProduct.getSort().equals("dsc")) {
            pageable = PageRequest.of(filterProduct.getCurrent() - 1, num, Sort.by("price").descending());
        }

        List<ProductEntity> productEntities = productRepository.findProductEntitiesByFilter(
                "%"+ filterProduct.getSearchName() + "%",
                filterProduct.getBrandId().isEmpty() ? null : filterProduct.getBrandId(),
                filterProduct.getSizeId().isEmpty() ? null : filterProduct.getSizeId(),
                filterProduct.getCategoryId().isEmpty() ? null : filterProduct.getCategoryId(),
                pageable
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
        productDTO.setCurrentPage(filterProduct.getCurrent());
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
            productDTO.setMainImage(productEntity.getMainImage());
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
            productDTO.setMainImage(productEntity.getMainImage());
            productDTO.setPrice(productEntity.getPrice());
            productDTOList.add(productDTO);
        });
        return productDTOList;
    }

    @Override
    public ProductDTO getDetailProduct(int id) {
        ProductDTO productDTO = new ProductDTO();
        ProductEntity productEntity = productRepository.findById(id);
        productDTO.setId(productEntity.getId());
        productDTO.setPrice(productEntity.getPrice());
        productDTO.setMainImage(productEntity.getMainImage());
        Optional<BrandEntity> brand = brandRepository.findById(productEntity.getBrand().getId());
        if(brand.isPresent()){
            productDTO.setBrandName(brand.get().getName());
        }
        productDTO.setName(productEntity.getName());
        Set<ImageProductEntity> imageProduct = productEntity.getImageProductEntities();
        List<String> images = new ArrayList<>();
        for(ImageProductEntity data : imageProduct){
            images.add(data.getName());
        }
        productDTO.setImages(images);

        return productDTO;
    }

    @Override
    public List<ProductDTO> searchProduct(String name) {
        List<ProductDTO> productDTOList = new ArrayList<>();
        name = stringUtil.removeWhiteSpaceBeginAndEnd(name);
        name = "%" + name + "%";
        List<ProductEntity> productEntityList = productRepository.findByKeyword(name);
        productEntityList.forEach(productEntity -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(productEntity.getId());
            productDTO.setName(productEntity.getName());
            productDTO.setMainImage(productEntity.getMainImage());
            productDTO.setPrice(productEntity.getPrice());
            productDTOList.add(productDTO);
        });
        return productDTOList;
    }

    @Override
    public List<ProductDTO> searchProductByBrandId(int brandId) {
        List<ProductDTO> productDTOList = new ArrayList<>();
        List<ProductEntity> productEntityList = productRepository.findAllByBrandId(brandId);
        productEntityList.forEach(productEntity -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(productEntity.getId());
            productDTO.setName(productEntity.getName());
            productDTO.setMainImage(productEntity.getMainImage());
            productDTO.setPrice(productEntity.getPrice());
            productDTOList.add(productDTO);
        });
        return productDTOList;
    }

    @Override
    public List<ProductDTO> searchProductByCategoryId(int categoryId) {
        List<ProductDTO> productDTOList = new ArrayList<>();
        List<ProductEntity> productEntityList = productRepository.findAllByCategoryId(categoryId);
        productEntityList.forEach(productEntity -> {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(productEntity.getId());
            productDTO.setName(productEntity.getName());
            productDTO.setMainImage(productEntity.getMainImage());
            productDTO.setPrice(productEntity.getPrice());
            productDTOList.add(productDTO);
        });
        return productDTOList;
    }

}
