package edu.miu.cs489.budgetbuddysystem.controller;

import edu.miu.cs489.budgetbuddysystem.dto.mapper.ExpenseMapper;
import edu.miu.cs489.budgetbuddysystem.dto.response.ExpenseResponse;
import edu.miu.cs489.budgetbuddysystem.model.Expense;
import edu.miu.cs489.budgetbuddysystem.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/{userId}/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ExpenseResponse addNewExpense(@PathVariable Long userId, @RequestBody Expense expense) {
        return ExpenseMapper.getExpenseResponse(expenseService.addNewExpense(userId, expense));
    }

    @GetMapping
    public List<ExpenseResponse> getAllExpenses(@PathVariable Long userId, @RequestParam(defaultValue = "") String category) {
        return ExpenseMapper.getExpenseResponse(expenseService.getAllExpenses(userId, category));
    }

    @GetMapping("/{expenseId}")
    public ExpenseResponse getExpenseById(@PathVariable Long userId, @PathVariable Long expenseId) {
        return ExpenseMapper.getExpenseResponse(expenseService.getExpenseById(userId, expenseId));
    }

    @PutMapping("/{expenseId}")
    public ExpenseResponse updateExpenseById(@PathVariable Long userId, @PathVariable Long expenseId, @RequestBody Expense updatedExpense) {
        return ExpenseMapper.getExpenseResponse(expenseService.updateExpenseById(userId, expenseId, updatedExpense));
    }

    @DeleteMapping("/{expenseId}")
    public void deleteExpenseById(@PathVariable Long userId, @PathVariable Long expenseId) {
        expenseService.deleteExpenseById(userId, expenseId);
    }
}
