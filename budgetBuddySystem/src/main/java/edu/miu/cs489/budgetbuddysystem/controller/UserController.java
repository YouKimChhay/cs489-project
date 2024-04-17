package edu.miu.cs489.budgetbuddysystem.controller;

import edu.miu.cs489.budgetbuddysystem.dto.request.AuthRequest;
import edu.miu.cs489.budgetbuddysystem.dto.response.AuthResponse;
import edu.miu.cs489.budgetbuddysystem.exception.EntityAlreadyExistException;
import edu.miu.cs489.budgetbuddysystem.model.User;
import edu.miu.cs489.budgetbuddysystem.service.UserService;
import edu.miu.cs489.budgetbuddysystem.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public AuthResponse addNewUser(@RequestBody User user) throws EntityAlreadyExistException {
        User newUser = userService.addNewUser(user);
        String token = jwtTokenUtil.generateToken(newUser);
        return AuthResponse.builder()
                .id(newUser.getId())
                .username(newUser.getUsername())
                .email(newUser.getEmail())
                .accessToken(token)
                .createdAt(newUser.getCreatedAt())
                .build();
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        User user = (User) authentication.getPrincipal();
        String token = jwtTokenUtil.generateToken(user);
        return AuthResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .accessToken(token)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
