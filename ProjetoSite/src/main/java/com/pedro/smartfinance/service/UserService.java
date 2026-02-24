package com.pedro.smartfinance.service;

import com.pedro.smartfinance.model.User;
import com.pedro.smartfinance.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User save(User user) {
        return repository.save(user);
    }
}
