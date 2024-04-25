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
import java.time.LocalDateTime;

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

//    private String description;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    private double amount;

//    @NotNull
//    @Column(nullable = false)
//    private LocalDate nextDueDate;

//    private Recurring recurring = Recurring.MONTHLY;

    @ManyToOne
    private Category category;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
