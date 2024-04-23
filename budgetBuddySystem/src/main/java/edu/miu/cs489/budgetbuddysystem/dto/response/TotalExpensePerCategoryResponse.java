package edu.miu.cs489.budgetbuddysystem.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TotalExpensePerCategoryResponse {
    private String categoryName;
    private double budget;
    private double totalExpense;
}
