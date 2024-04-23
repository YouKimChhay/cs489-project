package edu.miu.cs489.budgetbuddysystem.service.impl;

import edu.miu.cs489.budgetbuddysystem.exception.BadRequestException;
import edu.miu.cs489.budgetbuddysystem.model.Category;
import edu.miu.cs489.budgetbuddysystem.model.User;
import edu.miu.cs489.budgetbuddysystem.repository.CategoryRepository;
import edu.miu.cs489.budgetbuddysystem.repository.UserRepository;
import edu.miu.cs489.budgetbuddysystem.service.CategoryService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public Category addNewCategory(Long userId, Category category) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found."));
        if (categoryRepository.findCategoryByNameIgnoreCaseAndUserId(category.getName(), userId).isPresent())
            throw new BadRequestException("Category " + category.getName() + " already exist.");
        category.setUser(user);
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories(Long userId) {
        return categoryRepository.findCategoriesByUserId(userId);
    }

    @Override
    public Category getCategoryById(Long userId, Long categoryId) throws EntityNotFoundException {
        return categoryRepository.findCategoryByIdAndUserId(categoryId, userId).orElseThrow(() -> new EntityNotFoundException("Category " + categoryId + " not found"));
    }

    @Override
    public Category updateCategoryById(Long userId, Long categoryId, Category updatedCategory) throws EntityNotFoundException {
        Category category = getCategoryById(userId, categoryId);
        category.setName(updatedCategory.getName());
        category.setDescription(updatedCategory.getDescription());
        category.setBudget(updatedCategory.getBudget());
        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategoryById(Long userId, Long categoryId) {
        getCategoryById(userId, categoryId);
        categoryRepository.deleteById(categoryId);
    }
}
