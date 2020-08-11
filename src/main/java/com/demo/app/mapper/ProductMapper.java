package com.demo.app.mapper;

import com.demo.app.dto.ProductResponse;
import com.demo.app.model.Product;
import lombok.NonNull;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import java.math.BigDecimal;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public abstract class ProductMapper {

    public abstract ProductResponse toResponse(Product product);

    public String priceToString(@NonNull BigDecimal price) {
        return price.toString();
    }
}