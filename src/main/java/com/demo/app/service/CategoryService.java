package com.demo.app.service;

import com.demo.app.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();

    Category getById(Integer id);
}
