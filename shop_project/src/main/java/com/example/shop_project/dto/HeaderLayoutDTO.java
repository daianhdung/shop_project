package com.example.shop_project.dto;

public class HeaderLayoutDTO {
    private int billOrdered;
    private float diffBillOrdered;

    private int newCustomer;
    private float diffNewCustomer;

    private int billSold;
    private float diffBillSold;

    private int remainProduct;
    private float diffRemainProduct;

    public int getBillOrdered() {
        return billOrdered;
    }

    public void setBillOrdered(int billOrdered) {
        this.billOrdered = billOrdered;
    }

    public float getDiffBillOrdered() {
        return diffBillOrdered;
    }

    public void setDiffBillOrdered(float diffBillOrdered) {
        this.diffBillOrdered = diffBillOrdered;
    }

    public int getNewCustomer() {
        return newCustomer;
    }

    public void setNewCustomer(int newCustomer) {
        this.newCustomer = newCustomer;
    }

    public float getDiffNewCustomer() {
        return diffNewCustomer;
    }

    public void setDiffNewCustomer(float diffNewCustomer) {
        this.diffNewCustomer = diffNewCustomer;
    }

    public int getBillSold() {
        return billSold;
    }

    public void setBillSold(int billSold) {
        this.billSold = billSold;
    }

    public float getDiffBillSold() {
        return diffBillSold;
    }

    public void setDiffBillSold(float diffBillSold) {
        this.diffBillSold = diffBillSold;
    }

    public int getRemainProduct() {
        return remainProduct;
    }

    public void setRemainProduct(int remainProduct) {
        this.remainProduct = remainProduct;
    }

    public float getDiffRemainProduct() {
        return diffRemainProduct;
    }

    public void setDiffRemainProduct(float diffRemainProduct) {
        this.diffRemainProduct = diffRemainProduct;
    }
}
