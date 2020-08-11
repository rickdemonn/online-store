package com.demo.app.service.impl;

import com.demo.app.dto.ProductResponse;
import com.demo.app.exception.ProductNotFoundException;
import com.demo.app.mapper.ProductMapper;
import com.demo.app.repo.ProductRepo;
import com.demo.app.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepo productRepo, ProductMapper productMapper) {
        this.productRepo = productRepo;
        this.productMapper = productMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAll() {
        return productRepo.findAll().stream().map(productMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getById(Integer id) {
        return productMapper.toResponse(productRepo.getById(id).orElseThrow(ProductNotFoundException::new));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getByBrand(String name) {
        return productRepo.getByBrand(name).stream().map(productMapper::toResponse).collect(Collectors.toList());
    }
}
