package edu.miu.cs489.budgetbuddysystem.service;

import edu.miu.cs489.budgetbuddysystem.exception.EntityAlreadyExistException;
import edu.miu.cs489.budgetbuddysystem.model.User;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User addNewUser(User user) throws EntityAlreadyExistException;
    User findByEmail(String email) throws EntityNotFoundException;
}
