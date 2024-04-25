package edu.miu.cs489.budgetbuddysystem.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BillResponse {
    private Long userId;
    private Long billId;
    private String name;
    private double amount;
    private String categoryName;
    private LocalDateTime updatedAt;
}
