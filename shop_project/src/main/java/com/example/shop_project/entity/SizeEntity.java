package com.example.shop_project.entity;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "size")
public class SizeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "size")
    private Set<ProductSizeEntity> productSizes;

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

    public Set<ProductSizeEntity> getProductSizes() {
        return productSizes;
    }

    public void setProductSizes(Set<ProductSizeEntity> productSizes) {
        this.productSizes = productSizes;
    }

}
