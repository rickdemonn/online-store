package com.demo.app.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductResponse {
    private Integer id;
    private String brand;
    private String model;
    private String price;
    private Integer amount;
    private String description;
}
