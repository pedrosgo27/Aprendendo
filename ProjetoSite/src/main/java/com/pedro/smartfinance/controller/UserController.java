package com.pedro.smartfinance.controller;

import com.pedro.smartfinance.model.User;
import com.pedro.smartfinance.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository) {
        this.repository = repository;
    }

    // Criar usuário
    @PostMapping
    public User create(@RequestBody User user) {
        return repository.save(user);
    }

    // Listar usuários
    @GetMapping
    public List<User> list() {
        return repository.findAll();
    }

    // Login
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User found = repository.findByEmail(user.getEmail());
        if (found != null && found.getPassword().equals(user.getPassword())) {
            return "Login bem-sucedido! Bem-vindo, " + found.getName();
        }
        return "Email ou senha incorretos!";
    }
}
