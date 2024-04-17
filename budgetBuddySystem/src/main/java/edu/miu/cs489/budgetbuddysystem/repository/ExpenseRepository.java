package edu.miu.cs489.budgetbuddysystem.repository;

import edu.miu.cs489.budgetbuddysystem.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findExpensesByUserIdOrderByCreatedAtDesc(Long userId);
    List<Expense> findExpensesByUserIdAndCategoryNameOrderByCreatedAtDesc(Long userId, String categoryName);
    Optional<Expense> findExpenseByIdAndUserId(Long expenseId, Long userId);
}
