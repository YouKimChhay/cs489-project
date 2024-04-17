package edu.miu.cs489.budgetbuddysystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavingGoal {

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
    private LocalDate dueDate;

    @NotNull
    @PositiveOrZero
    @Column(nullable = false)
    private double percentage = 0;

    @Column(nullable = false)
    private boolean isActive = true;

    @PositiveOrZero
    @Column(nullable = false)
    private double currentSavedAmount = 0;

    @OneToMany
    @JoinColumn(name = "saving_goal_id")
    private List<Saving> savings;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
