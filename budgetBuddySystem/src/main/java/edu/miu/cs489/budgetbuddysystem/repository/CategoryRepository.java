package edu.miu.cs489.budgetbuddysystem.repository;

import edu.miu.cs489.budgetbuddysystem.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findCategoriesByUserIdOrderByName(Long userId);
    Optional<Category> findCategoryByIdAndUserId(Long categoryId, Long userId);
    Optional<Category> findCategoryByNameAndUserId(String name, Long userId);
}
