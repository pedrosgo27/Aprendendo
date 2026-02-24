package com.pedro.smartfinance.repository;

import com.pedro.smartfinance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email); // busca automática por email
}
