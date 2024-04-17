package edu.miu.cs489.budgetbuddysystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Saving {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    private double amount;

    @NotNull
    @Column(nullable = false)
    private LocalDate savedDate;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
