package edu.miu.cs489.budgetbuddysystem.controller;

import edu.miu.cs489.budgetbuddysystem.dto.mapper.BillMapper;
import edu.miu.cs489.budgetbuddysystem.dto.mapper.ExpenseMapper;
import edu.miu.cs489.budgetbuddysystem.dto.response.BillResponse;
import edu.miu.cs489.budgetbuddysystem.dto.response.ExpenseResponse;
import edu.miu.cs489.budgetbuddysystem.model.Bill;
import edu.miu.cs489.budgetbuddysystem.service.BillService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/{userId}/bills")
public class BillController {

    private final BillService billService;

    @PostMapping
    public BillResponse addNewBill(@PathVariable Long userId, @RequestBody Bill bill) {
        return BillMapper.getBillResponse(billService.addNewBill(userId, bill));
    }

    @GetMapping
    public List<BillResponse> getAllBills(@PathVariable Long userId) {
        return BillMapper.getBillResponse(billService.getAllBills(userId));
    }

    @GetMapping("/{billId}")
    public BillResponse getBillById(@PathVariable Long userId, @PathVariable Long billId) {
        return BillMapper.getBillResponse(billService.getBillById(userId, billId));
    }

    @PutMapping("/{billId}")
    public BillResponse updateBillById(@PathVariable Long userId, @PathVariable Long billId, @RequestBody Bill updatedBill) {
        return BillMapper.getBillResponse(billService.updateBillById(userId, billId, updatedBill));
    }

    @DeleteMapping("/{billId}")
    public void deleteBillById(@PathVariable Long userId, @PathVariable Long billId) {
        billService.deleteBillById(userId, billId);
    }

    @PostMapping("/{billId}")
    public ExpenseResponse payBill(@PathVariable Long userId, @PathVariable Long billId) {
        return ExpenseMapper.getExpenseResponse(billService.payBill(userId, billId));
    }

}
