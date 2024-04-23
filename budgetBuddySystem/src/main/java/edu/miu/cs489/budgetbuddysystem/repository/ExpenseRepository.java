package edu.miu.cs489.budgetbuddysystem.repository;

import edu.miu.cs489.budgetbuddysystem.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findExpensesByUserIdAndPaymentDateBetween(Long userId, LocalDate start, LocalDate end);
    List<Expense> findExpensesByUserIdOrderByPaymentDateDesc(Long userId);
    List<Expense> findExpensesByUserIdAndCategoryIdAndPaymentDateBetween(Long userId, Long categoryId, LocalDate start, LocalDate end);
    List<Expense> findExpensesByUserIdAndCategoryNameOrderByPaymentDateDesc(Long userId, String categoryName);
    Optional<Expense> findExpenseByIdAndUserId(Long expenseId, Long userId);
}
