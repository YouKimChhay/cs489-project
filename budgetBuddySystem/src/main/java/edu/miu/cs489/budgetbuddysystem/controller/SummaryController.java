package edu.miu.cs489.budgetbuddysystem.controller;

import edu.miu.cs489.budgetbuddysystem.dto.response.SummaryResponse;
import edu.miu.cs489.budgetbuddysystem.service.SummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/{userId}")
public class SummaryController {

    private final SummaryService summaryService;

    @GetMapping("/summary")
    public SummaryResponse getSummaryByUserId(@PathVariable Long userId, @RequestParam int year, @RequestParam int month) {
        return summaryService.getSummaryByUserId(userId, year, month);
    }

}
