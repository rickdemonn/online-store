package com.demo.app.service;

import com.demo.app.dto.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAll();

    ProductResponse getById(Integer id);

    List<ProductResponse> getByBrand(String name);
}
