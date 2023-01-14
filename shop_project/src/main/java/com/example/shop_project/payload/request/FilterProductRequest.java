package com.example.shop_project.payload.request;

import java.util.List;

public class FilterProductRequest {
    private String searchName;
    private List<Integer> brandId;
    private List<Integer> sizeId;
    private List<Integer> categoryId;

    public String getSearchName() {
        return searchName;
    }

    public void setSearchName(String searchName) {
        this.searchName = searchName;
    }

    public List<Integer> getBrandId() {
        return brandId;
    }

    public void setBrandId(List<Integer> brandId) {
        this.brandId = brandId;
    }

    public List<Integer> getSizeId() {
        return sizeId;
    }

    public void setSizeId(List<Integer> sizeId) {
        this.sizeId = sizeId;
    }

    public List<Integer> getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(List<Integer> categoryId) {
        this.categoryId = categoryId;
    }
}
