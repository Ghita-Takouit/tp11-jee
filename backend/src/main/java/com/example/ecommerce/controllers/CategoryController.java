package com.example.ecommerce.controllers;

import com.example.ecommerce.entities.CategoryEntity;
import com.example.ecommerce.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryEntity> list() {
        return categoryService.list();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryEntity> get(@PathVariable Long id) {
        CategoryEntity category = categoryService.get(id);
        if (category != null) {
            return ResponseEntity.ok(category);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public CategoryEntity create(@RequestBody CategoryEntity c) {
        return categoryService.create(c);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryEntity> update(@PathVariable Long id, @RequestBody CategoryEntity c) {
        CategoryEntity updated = categoryService.update(id, c);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
