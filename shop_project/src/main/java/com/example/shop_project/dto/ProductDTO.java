package com.example.shop_project.dto;

import com.example.shop_project.entity.ImageProductEntity;
import com.example.shop_project.model.ProductModel;

import java.util.List;
import java.util.Set;

public class ProductDTO {
    private int id;
    private String name;
    private int price;
    private String mainImage;
    private String brandName;
    private String categoryName;
    private List<String> images;

    private List<SizeDTO> listSizeDTO;
    private int size;
    private int quantity;
    private int totalPage;
    private int currentPage;
    private List<ProductModel> products;

    public List<SizeDTO> getListSizeDTO() {
        return listSizeDTO;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public void setListSizeDTO(List<SizeDTO> listSizeDTO) {
        this.listSizeDTO = listSizeDTO;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public List<ProductModel> getProducts() {
        return products;
    }

    public void setProducts(List<ProductModel> products) {
        this.products = products;
    }

    public int getId() {
        return id;
    }

    public String getMainImage() {
        return mainImage;
    }

    public String getBrandName() {
        return brandName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
