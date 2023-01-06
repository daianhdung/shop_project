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
    @Column(name = "image")
    private String image;
    @Column(name = "price")
    private int price;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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
}
