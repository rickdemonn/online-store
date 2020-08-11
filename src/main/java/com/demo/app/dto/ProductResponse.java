package com.demo.app.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductResponse {
    private Integer id;
    private Integer categoryId;
    private String brand;
    private String model;
    private String price;
    private String img;
    private String description;
}
