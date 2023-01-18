package com.example.shop_project.service.imp;


import com.example.shop_project.dto.ProductDTO;
import com.example.shop_project.dto.ProductDetailDTO;
import com.example.shop_project.entity.*;
import com.example.shop_project.model.ProductModel;
import com.example.shop_project.payload.request.FilterProductRequest;
import com.example.shop_project.payload.request.ProductRequest;
import com.example.shop_project.repository.BrandRepository;
import com.example.shop_project.repository.CategoryRepository;
import com.example.shop_project.repository.ProductRepository;
import com.example.shop_project.service.ProductService;
import com.example.shop_project.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    BrandRepository brandRepository;
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    StringUtil stringUtil;
    private int num = 9;

    @Override
    public int getTotalPage(FilterProductRequest filterProduct) {
        int size = productRepository.findProductEntitiesByFilter(
                "%"+ filterProduct.getSearchName() + "%",
                filterProduct.getBrandId().isEmpty(), filterProduct.getBrandId(),
                filterProduct.getSizeId().isEmpty(), filterProduct.getSizeId(),
                filterProduct.getCategoryId().isEmpty(), filterProduct.getCategoryId()).size();
        int totalPage = 0;
        if (size % num == 0) {
            totalPage = size / num;
        } else {
            totalPage = size / num + 1;
        }

        return totalPage;
    }

    @Override
    public ProductDTO getProducts() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        List<ProductEntity> productEntities = productRepository.findAll();
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
        productDTO.setProducts(productModels);
        return productDTO;
    }

    @Override
    public ProductDTO getProductByFilter(FilterProductRequest filterProduct) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
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
                filterProduct.getBrandId().isEmpty(), filterProduct.getBrandId(),
                filterProduct.getSizeId().isEmpty(), filterProduct.getSizeId(),
                filterProduct.getCategoryId().isEmpty(), filterProduct.getCategoryId(),
                pageable
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
        productDTO.setTotalPage(this.getTotalPage(filterProduct));
        productDTO.setCurrentPage(filterProduct.getCurrent());
        productDTO.setProducts(productModels);

        return productDTO;

    }

    @Override
    public ProductDetailDTO getProduct(int id) {
        ProductEntity product = productRepository.findById(id);

        ProductDetailDTO productDetailDTO = new ProductDetailDTO();
        productDetailDTO.setId(product.getId());
        productDetailDTO.setName(product.getName());
        productDetailDTO.setImage(product.getMainImage());
        productDetailDTO.setBrand(product.getBrand().getId());
        productDetailDTO.setCategory(product.getCategory().getId());
        productDetailDTO.setPrice(product.getPrice());
        List<Integer> ids = product.getProductSizes().stream()
                            .map(productSizeEntity -> productSizeEntity.getSize().getId())
                            .collect(Collectors.toList());
        productDetailDTO.setSizes(ids);


        return productDetailDTO;
    }

    @Override
    public boolean insertProduct(ProductRequest product) {
        ProductEntity productEntity = new ProductEntity();
        productEntity.setName(product.getName());
        productEntity.setMainImage(product.getImage());
        productEntity.setPrice(product.getPrice());
        productEntity.setCategory(categoryRepository.findById(product.getCategory()).orElse(null));
        productEntity.setBrand(brandRepository.findById(product.getBrand()).orElse(null));
        try {
            productRepository.save(productEntity);
            Set<ProductSizeEntity> productSizeEntitySet = new HashSet<>();
            product.getSizes().forEach(size -> {
                ProductSizeEntity productSizeEntity = new ProductSizeEntity();
                productSizeEntity.setSizeId(size);
                productSizeEntity.setProductId(productEntity.getId());
                productSizeEntitySet.add(productSizeEntity);
            });
            productEntity.setProductSizes(productSizeEntitySet);
            productRepository.save(productEntity);
            return true;
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updateProduct(ProductRequest product) {
        ProductEntity productEntity = productRepository.findById(product.getId());
        productEntity.setName(product.getName());
        productEntity.setMainImage(product.getImage());
        productEntity.setPrice(product.getPrice());
        productEntity.setCategory(categoryRepository.findById(product.getCategory()).orElse(null));
        productEntity.setBrand(brandRepository.findById(product.getBrand()).orElse(null));
        Set<ProductSizeEntity> productSizeEntitySet = new HashSet<>();
        product.getSizes().forEach(size -> {
            ProductSizeEntity productSizeEntity = new ProductSizeEntity();
            productSizeEntity.setSizeId(size);
            productSizeEntity.setProductId(productEntity.getId());
            productSizeEntitySet.add(productSizeEntity);
        });
        productEntity.setProductSizes(productSizeEntitySet);
        try {
            productRepository.save(productEntity);
            return true;
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean deleteProduct(int id) {
        try {
            productRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
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
