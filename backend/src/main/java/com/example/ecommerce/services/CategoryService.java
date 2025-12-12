package com.example.ecommerce.services;

import com.example.ecommerce.entities.CategoryEntity;
import com.example.ecommerce.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryEntity create(CategoryEntity c) {
        return categoryRepository.save(c);
    }

    public CategoryEntity update(Long id, CategoryEntity c) {
        Optional<CategoryEntity> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            CategoryEntity category = existingCategory.get();
            category.setName(c.getName());
            category.setDescription(c.getDescription());
            return categoryRepository.save(category);
        }
        return null;
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }

    public CategoryEntity get(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public List<CategoryEntity> list() {
        return categoryRepository.findAll();
    }
}
