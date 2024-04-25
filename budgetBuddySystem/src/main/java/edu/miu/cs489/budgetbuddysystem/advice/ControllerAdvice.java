package edu.miu.cs489.budgetbuddysystem.advice;

import edu.miu.cs489.budgetbuddysystem.utils.UserContextUtil;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ControllerAdvice {

    @Before("(execution(* edu.miu.cs489.budgetbuddysystem.controller.IncomeController.*(..)) && args(userId,..)) ||" +
            "(execution(* edu.miu.cs489.budgetbuddysystem.controller.CategoryController.*(..)) && args(userId,..)) ||" +
            "(execution(* edu.miu.cs489.budgetbuddysystem.controller.ExpenseController.*(..)) && args(userId,..)) ||" +
            "(execution(* edu.miu.cs489.budgetbuddysystem.controller.SummaryController.*(..)) && args(userId,..)) ||" +
            "(execution(* edu.miu.cs489.budgetbuddysystem.controller.BillController.*(..)) && args(userId,..))")
    public void validateUserForCategoryController(JoinPoint joinPoint, Long userId) {
        UserContextUtil.validateUser(userId);
    }
}
