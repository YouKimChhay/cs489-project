package edu.miu.cs489.budgetbuddysystem.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SummaryResponse {
    private Long userId;
    private double totalIncome;
    private double totalExpense;
    private List<TotalExpensePerCategoryResponse> totalExpensePerCategoryList;
}
