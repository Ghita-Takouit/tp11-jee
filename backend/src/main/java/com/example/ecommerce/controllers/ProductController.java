package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.ProductEntity;
import com.example.ecommerce.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductEntity> list() {
        return productService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> get(@PathVariable Long id) {
        ProductEntity product = productService.get(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/category/{id}")
    public List<ProductEntity> listByCategory(@PathVariable Long id) {
        return productService.listByCategory(id);
    }

    @PostMapping
    public ProductEntity create(@RequestBody ProductEntity p) {
        return productService.create(p);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductEntity> update(@PathVariable Long id, @RequestBody ProductEntity p) {
        ProductEntity updated = productService.update(id, p);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
