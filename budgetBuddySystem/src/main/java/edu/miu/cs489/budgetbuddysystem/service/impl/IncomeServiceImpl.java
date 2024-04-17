package edu.miu.cs489.budgetbuddysystem.service.impl;

import edu.miu.cs489.budgetbuddysystem.model.Income;
import edu.miu.cs489.budgetbuddysystem.model.User;
import edu.miu.cs489.budgetbuddysystem.repository.IncomeRepository;
import edu.miu.cs489.budgetbuddysystem.repository.UserRepository;
import edu.miu.cs489.budgetbuddysystem.service.IncomeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

    private final UserRepository userRepository;
    private final IncomeRepository incomeRepository;

    @Override
    public Income addNewIncome(Long userId, Income income) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        income.setUser(user);
        return incomeRepository.save(income);
    }

    @Override
    public List<Income> getAllIncomes(Long userId) {
        return incomeRepository.findIncomesByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    public Income getIncomeById(Long userId, Long incomeId) throws EntityNotFoundException {
        return incomeRepository.findIncomeByIdAndUserId(incomeId, userId).orElseThrow(() -> new EntityNotFoundException("Income " + incomeId + " not found."));
    }

    @Override
    public Income updateIncomeById(Long userId, Long incomeId, Income updatedIncome) throws EntityNotFoundException {
        Income income = getIncomeById(userId, incomeId);
        income.setSource(updatedIncome.getSource());
        income.setAmount(updatedIncome.getAmount());
        income.setActive(updatedIncome.isActive());
        return incomeRepository.save(income);
    }

    @Override
    public void deleteIncomeById(Long userId, Long incomeId) {
        getIncomeById(userId, incomeId);
        incomeRepository.deleteById(incomeId);
    }
}
