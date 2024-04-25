package edu.miu.cs489.budgetbuddysystem.service.impl;

import edu.miu.cs489.budgetbuddysystem.model.Income;
import edu.miu.cs489.budgetbuddysystem.model.User;
import edu.miu.cs489.budgetbuddysystem.repository.IncomeRepository;
import edu.miu.cs489.budgetbuddysystem.repository.UserRepository;
import edu.miu.cs489.budgetbuddysystem.service.IncomeService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IncomeServiceImplTest {

    @Mock
    private IncomeRepository incomeRepository;
    @Mock
    private UserRepository userRepository;
    private User user;
    private Income income;
    private final LocalDate payDate = LocalDate.now();
    private final LocalDateTime createdAt = LocalDateTime.now();

    private IncomeService incomeService;


    @BeforeEach
    void setUp() {
        incomeService = new IncomeServiceImpl(userRepository, incomeRepository);

        user = new User(1L, "jane@gmail.com", "12345", "Jane", LocalDateTime.now());

        income = new Income(1L, "Full-time Work", 8000, payDate, createdAt, user);
    }

    @AfterEach
    void tearDown() {
        incomeService = null;
    }

    @Test
    void addNewIncome() {
        Income newIncome = Income.builder().source("Full-time Work").amount(8000).payDate(payDate).build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(incomeRepository.save(newIncome)).thenReturn(income);

        Income savedIncome = incomeService.addNewIncome(1L, newIncome);
        assertEquals(income, savedIncome);

        verify(userRepository, times(1)).findById(1L);
        verifyNoMoreInteractions(userRepository);

        verify(incomeRepository, times(1)).save(newIncome);
        verifyNoMoreInteractions(incomeRepository);
    }

    @Test
    void getAllIncomes() {
        when(incomeRepository.findIncomesByUserIdOrderByPayDateDesc(1L)).thenReturn(List.of(income));

        List<Income> incomes = incomeService.getAllIncomes(1L);
        assertEquals(1, incomes.size());
        assertEquals(income, incomes.get(0));

        verify(incomeRepository, times(1)).findIncomesByUserIdOrderByPayDateDesc(1L);
        verifyNoMoreInteractions(incomeRepository);
        verifyNoInteractions(userRepository);
    }

    @Test
    void getIncomeById() {
        when(incomeRepository.findIncomeByIdAndUserId(1L, 1L)).thenReturn(Optional.of(income));

        Income resultIncome = incomeService.getIncomeById(1L, 1L);
        assertEquals(income, resultIncome);

        verify(incomeRepository, times(1)).findIncomeByIdAndUserId(1L, 1L);
        verifyNoMoreInteractions(incomeRepository);
        verifyNoInteractions(userRepository);
    }

    @Test
    void updateIncomeById() {
        Income updatedIncome = new Income(1L, "Part-time Work", 5000.75, payDate, createdAt, user);
        Income savedUpdatedIncome = new Income(1L, "Part-time Work", 5000.75, payDate, createdAt, user);

        when(incomeRepository.findIncomeByIdAndUserId(1L, 1L)).thenReturn(Optional.of(income));
        when(incomeRepository.save(updatedIncome)).thenReturn(savedUpdatedIncome);

        Income resultIncome = incomeService.updateIncomeById(1L, 1L, updatedIncome);
        assertEquals(savedUpdatedIncome, resultIncome);

        verify(incomeRepository, times(1)).findIncomeByIdAndUserId(1L, 1L);
        verify(incomeRepository, times(1)).save(updatedIncome);
        verifyNoMoreInteractions(incomeRepository);
        verifyNoInteractions(userRepository);
    }

    @Test
    void deleteIncomeById() {
        when(incomeRepository.findIncomeByIdAndUserId(1L, 1L)).thenReturn(Optional.of(income));

        incomeService.deleteIncomeById(1L, 1L);
        verify(incomeRepository, times(1)).findIncomeByIdAndUserId(1L, 1L);
        verify(incomeRepository, times(1)).deleteById(1L);
        verifyNoMoreInteractions(incomeRepository);
        verifyNoInteractions(userRepository);
    }
}