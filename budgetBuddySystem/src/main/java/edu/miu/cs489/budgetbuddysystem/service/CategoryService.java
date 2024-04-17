package edu.miu.cs489.budgetbuddysystem.service;

import edu.miu.cs489.budgetbuddysystem.model.Category;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

public interface CategoryService {
    Category addNewCategory(Long userId, Category category);
    List<Category> getAllCategories(Long userId);
    Category getCategoryById(Long userId, Long categoryId) throws EntityNotFoundException;
    Category updateCategoryById(Long userId, Long categoryId, Category updatedCategory) throws EntityNotFoundException;
    void deleteCategoryById(Long userId, Long categoryId);
}
