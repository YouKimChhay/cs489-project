package edu.miu.cs489.budgetbuddysystem.service.impl;

import edu.miu.cs489.budgetbuddysystem.model.Expense;
import edu.miu.cs489.budgetbuddysystem.model.User;
import edu.miu.cs489.budgetbuddysystem.repository.CategoryRepository;
import edu.miu.cs489.budgetbuddysystem.repository.ExpenseRepository;
import edu.miu.cs489.budgetbuddysystem.repository.UserRepository;
import edu.miu.cs489.budgetbuddysystem.service.ExpenseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public Expense addNewExpense(Long userId, Expense expense) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        expense.setUser(user);
        expense.setCategory(categoryRepository.findCategoryByNameAndUserId(expense.getCategory().getName(), userId).orElseThrow(() -> new EntityNotFoundException("Category not found")));
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses(Long userId, String categoryName) {
        if (categoryName != null && !categoryName.isEmpty())
            return expenseRepository.findExpensesByUserIdAndCategoryNameOrderByCreatedAtDesc(userId, categoryName);
        return expenseRepository.findExpensesByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public Expense getExpenseById(Long userId, Long expenseId) throws EntityNotFoundException {
        return expenseRepository.findExpenseByIdAndUserId(expenseId, userId).orElseThrow(() -> new EntityNotFoundException("Expense " + expenseId + " not found"));
    }

    @Override
    public Expense updateExpenseById(Long userId, Long expenseId, Expense updatedExpense) throws EntityNotFoundException {
        Expense expense = getExpenseById(userId, expenseId);
        expense.setName(updatedExpense.getName());
        expense.setDescription(updatedExpense.getDescription());
        expense.setAmount(updatedExpense.getAmount());
        expense.setPaymentDate(updatedExpense.getPaymentDate());
        if (!expense.getCategory().getName().equals(updatedExpense.getCategory().getName()))
            expense.setCategory(categoryRepository.findCategoryByNameAndUserId(updatedExpense.getCategory().getName(), userId).orElseThrow(() -> new EntityNotFoundException("Category not found")));
        return expenseRepository.save(expense);
    }

    @Override
    public void deleteExpenseById(Long userId, Long expenseId) {
        getExpenseById(userId, expenseId);
        expenseRepository.deleteById(expenseId);
    }
}
