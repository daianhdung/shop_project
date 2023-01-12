package com.example.shop_project.model;

public class ProductModel {
    private int id;
    private String name;
    private int price;
    private String image;
    private boolean isBookmark;

    public int getId() {
        return id;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isBookmark() {
        return isBookmark;
    }

    public void setBookmark(boolean bookmark) {
        isBookmark = bookmark;
    }
}
