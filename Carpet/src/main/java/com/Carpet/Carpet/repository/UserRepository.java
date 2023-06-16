package com.Carpet.Carpet.repository;

import com.Carpet.Carpet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{
    User findByEmail(String email);
}