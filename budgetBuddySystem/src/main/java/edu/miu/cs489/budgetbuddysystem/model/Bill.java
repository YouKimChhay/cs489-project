package edu.miu.cs489.budgetbuddysystem.model;

import edu.miu.cs489.budgetbuddysystem.utils.Recurring;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Column(nullable = false)
    private String name;

    private String description;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    private double amount;

    @NotNull
    @Column(nullable = false)
    private LocalDate nextDueDate;

    private Recurring recurring = Recurring.MONTHLY;

    @ManyToOne
    private Category category;
}
