package edu.miu.cs489.budgetbuddysystem.service;

import edu.miu.cs489.budgetbuddysystem.model.Income;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

public interface IncomeService {
    Income addNewIncome(Long userId, Income income);
    List<Income> getAllIncomes(Long userId);
    Income getIncomeById(Long userId, Long incomeId) throws EntityNotFoundException;
    Income updateIncomeById(Long userId, Long incomeId, Income updatedIncome) throws EntityNotFoundException;
    void deleteIncomeById(Long userId, Long incomeId);
}
