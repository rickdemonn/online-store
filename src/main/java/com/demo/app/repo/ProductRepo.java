package com.demo.app.repo;

import com.demo.app.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Integer> {

    Optional<Product> getById(Integer id);

    List<Product> getByBrand(String name);

}
