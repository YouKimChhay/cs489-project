package edu.miu.cs489.budgetbuddysystem.utils;

import edu.miu.cs489.budgetbuddysystem.exception.UnauthorizedException;
import edu.miu.cs489.budgetbuddysystem.model.User;
import edu.miu.cs489.budgetbuddysystem.service.UserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


public class UserContextUtil {

    private static UserService userService;

    @Component
    private static class InnerClass {
        private InnerClass(UserService userService) {
            UserContextUtil.userService = userService;
        }
    }

    public static User getUser() {
        return userService.findByEmail((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    public static User validateUser(Long userId) {
        User user = getUser();
        if (user.getId() != userId)
            throw new UnauthorizedException("User ids do not match.");
        return user;
    }

}
