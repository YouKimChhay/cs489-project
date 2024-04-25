package edu.miu.cs489.budgetbuddysystem.dto.mapper;

import edu.miu.cs489.budgetbuddysystem.dto.response.BillResponse;
import edu.miu.cs489.budgetbuddysystem.model.Bill;

import java.util.List;

public class BillMapper {

    public static BillResponse getBillResponse(Bill bill) {
        return BillResponse.builder()
                .userId(bill.getUser().getId())
                .billId(bill.getId())
                .name(bill.getName())
                .amount(bill.getAmount())
                .categoryName(bill.getCategory().getName())
                .updatedAt(bill.getUpdatedAt())
                .build();
    }

    public static List<BillResponse> getBillResponse(List<Bill> bills) {
        return bills.stream()
                .map(bill -> getBillResponse(bill))
                .toList();
    }
}
