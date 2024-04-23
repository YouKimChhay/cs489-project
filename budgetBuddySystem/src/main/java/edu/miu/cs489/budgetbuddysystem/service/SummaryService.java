package edu.miu.cs489.budgetbuddysystem.service;

import edu.miu.cs489.budgetbuddysystem.dto.response.SummaryResponse;

public interface SummaryService {
    SummaryResponse getSummaryByUserId(Long userId, int year, int month);
}
