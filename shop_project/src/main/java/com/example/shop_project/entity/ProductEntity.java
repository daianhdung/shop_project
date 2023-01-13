package com.example.shop_project.entity;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "main_image")
    private String mainImage;
    @Column(name = "price")
    private int price;

    @Column(name = "amount_of_sold")
    private int amountOfSold;

    @OneToMany(mappedBy = "product")
    private Set<ImageProductEntity> imageProductEntities;
    @OneToMany(mappedBy = "product")
    private Set<ProductSizeEntity> productSizes;
    @OneToMany(mappedBy = "product")
    private Set<BookmarkProductEntity> bookmarkProducts;
    @OneToMany(mappedBy = "product")
    private Set<ProductOrderEntity> productOrders;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private BrandEntity brand;



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

    public String getMainImage() {
        return mainImage;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public int getAmountOfSold() {
        return amountOfSold;
    }

    public void setAmountOfSold(int amountOfSold) {
        this.amountOfSold = amountOfSold;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }


    public CategoryEntity getCategory() {
        return category;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }

    public BrandEntity getBrand() {
        return brand;
    }

    public void setBrand(BrandEntity brand) {
        this.brand = brand;
    }

    public Set<ProductSizeEntity> getProductSizes() {
        return productSizes;
    }

    public void setProductSizes(Set<ProductSizeEntity> productSizes) {
        this.productSizes = productSizes;
    }

    public Set<BookmarkProductEntity> getBookmarkProducts() {
        return bookmarkProducts;
    }

    public void setBookmarkProducts(Set<BookmarkProductEntity> bookmarkProducts) {
        this.bookmarkProducts = bookmarkProducts;
    }

    public Set<ProductOrderEntity> getProductOrders() {
        return productOrders;
    }

    public void setProductOrders(Set<ProductOrderEntity> productOrders) {
        this.productOrders = productOrders;
    }

    public Set<ImageProductEntity> getImageProductEntities() {
        return imageProductEntities;
    }

    public void setImageProductEntities(Set<ImageProductEntity> imageProductEntities) {
        this.imageProductEntities = imageProductEntities;
    }

}

