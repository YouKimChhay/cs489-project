package edu.miu.cs489.budgetbuddysystem.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class IncomeResponse {
    private Long incomeId;
    private Long userId;
    private String source;
    private double amount;
    private LocalDate payDate;
    private LocalDateTime createdAt;
}
