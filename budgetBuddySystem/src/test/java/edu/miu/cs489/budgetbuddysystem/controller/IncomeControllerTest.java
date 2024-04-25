package edu.miu.cs489.budgetbuddysystem.controller;

import edu.miu.cs489.budgetbuddysystem.dto.mapper.IncomeMapper;
import edu.miu.cs489.budgetbuddysystem.dto.response.IncomeResponse;
import edu.miu.cs489.budgetbuddysystem.model.Income;
import edu.miu.cs489.budgetbuddysystem.model.User;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class IncomeControllerTest {

    @Mock
    private IncomeService incomeService;
    private User user;
    private Income income;
    private final LocalDate payDate = LocalDate.now();
    private final LocalDateTime createdAt = LocalDateTime.now();

    private IncomeController incomeController;

    @BeforeEach
    void setUp() {
        incomeController = new IncomeController(incomeService);

        user = new User(1L, "jane@gmail.com", "12345", "Jane", LocalDateTime.now());

        income = new Income(1L, "Full-time Work", 8000, payDate, createdAt, user);
    }

    @AfterEach
    void tearDown() {
        incomeController = null;
    }

    @Test
    void getAllIncomes() {
        when(incomeService.getAllIncomes(1L)).thenReturn(List.of(income));

        List<IncomeResponse> incomeResponses = incomeController.getAllIncomes(1L);
        assertEquals(IncomeMapper.getIncomeResponse(List.of(income)), incomeResponses);

        verify(incomeService, times(1)).getAllIncomes(1L);
        verifyNoMoreInteractions(incomeService);
    }

    @Test
    void addNewIncome() {
        Income newIncome = Income.builder().source("Full-time Work").amount(8000).payDate(payDate).build();

        when(incomeService.addNewIncome(1L, newIncome)).thenReturn(income);

        IncomeResponse savedIncome = incomeController.addNewIncome(1L, newIncome);
        assertEquals(IncomeMapper.getIncomeResponse(income), savedIncome);

        verify(incomeService, times(1)).addNewIncome(1L, newIncome);
        verifyNoMoreInteractions(incomeService);
    }

    @Test
    void getIncomeById() {
        when(incomeService.getIncomeById(1L, 1L)).thenReturn(income);

        IncomeResponse resultIncome = incomeController.getIncomeById(1L, 1L);
        assertEquals(IncomeMapper.getIncomeResponse(income), resultIncome);

        verify(incomeService, times(1)).getIncomeById(1L, 1L);
        verifyNoMoreInteractions(incomeService);
    }

    @Test
    void updateIncomeById() {
        Income updatedIncome = new Income(1L, "Part-time Work", 5000.75, payDate, createdAt, user);
        Income savedUpdatedIncome = new Income(1L, "Part-time Work", 5000.75, payDate, createdAt, user);

        when(incomeService.updateIncomeById(1L, 1L, updatedIncome)).thenReturn(savedUpdatedIncome);

        IncomeResponse resultIncome = incomeController.updateIncomeById(1L, 1L, updatedIncome);
        assertEquals(IncomeMapper.getIncomeResponse(savedUpdatedIncome), resultIncome);

        verify(incomeService, times(1)).updateIncomeById(1L, 1L, updatedIncome);
        verifyNoMoreInteractions(incomeService);
    }

    @Test
    void deleteIncomeById() {
        incomeController.deleteIncomeById(1L, 1L);

        verify(incomeService, times(1)).deleteIncomeById(1L, 1L);
        verifyNoMoreInteractions(incomeService);
    }
}