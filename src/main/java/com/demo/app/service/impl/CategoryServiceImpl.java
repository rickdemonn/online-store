package com.demo.app.service.impl;

import com.demo.app.model.Category;
import com.demo.app.repo.CategoryRepo;
import com.demo.app.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;

    public CategoryServiceImpl(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<Category> getAll() {
        return categoryRepo.findAll();
    }

    @Override
    public Category getById(Integer id) {
        return categoryRepo.getById(id).orElseThrow();
    }
}
