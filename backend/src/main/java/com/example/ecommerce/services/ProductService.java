package com.example.ecommerce.services;

import com.example.ecommerce.entities.ProductEntity;
import com.example.ecommerce.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductEntity create(ProductEntity p) {
        return productRepository.save(p);
    }

    public ProductEntity update(Long id, ProductEntity p) {
        Optional<ProductEntity> existingProduct = productRepository.findById(id);
        if (existingProduct.isPresent()) {
            ProductEntity product = existingProduct.get();
            product.setName(p.getName());
            product.setPrice(p.getPrice());
            product.setStock(p.getStock());
            product.setCategory(p.getCategory());
            return productRepository.save(product);
        }
        return null;
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public ProductEntity get(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public List<ProductEntity> list() {
        return productRepository.findAll();
    }

    public List<ProductEntity> listByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
}
