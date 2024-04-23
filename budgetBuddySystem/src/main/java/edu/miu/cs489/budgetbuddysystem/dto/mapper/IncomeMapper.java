package edu.miu.cs489.budgetbuddysystem.dto.mapper;

import edu.miu.cs489.budgetbuddysystem.dto.response.IncomeResponse;
import edu.miu.cs489.budgetbuddysystem.model.Income;

import java.util.List;

public class IncomeMapper {

    public static IncomeResponse getIncomeResponse(Income income) {
        return IncomeResponse.builder()
                .incomeId(income.getId())
                .userId(income.getUser().getId())
                .amount(income.getAmount())
                .source(income.getSource())
                .payDate(income.getPayDate())
                .createdAt(income.getCreatedAt())
                .build();
    }

    public static List<IncomeResponse> getIncomeResponse(List<Income> incomes) {
        return incomes.stream()
                .map(income -> getIncomeResponse(income))
                .toList();
    }
}
