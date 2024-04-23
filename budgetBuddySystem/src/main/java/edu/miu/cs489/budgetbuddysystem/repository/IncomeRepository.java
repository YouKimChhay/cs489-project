package edu.miu.cs489.budgetbuddysystem.repository;

import edu.miu.cs489.budgetbuddysystem.model.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findIncomesByUserIdAndPayDateBetween(Long userId, LocalDate start, LocalDate end);
    List<Income> findIncomesByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Income> findIncomeByIdAndUserId(Long incomeId, Long userId);
}
