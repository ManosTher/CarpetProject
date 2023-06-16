package com.Carpet.Carpet.repository;

import com.Carpet.Carpet.model.State;
import org.springframework.data.jpa.repository.JpaRepository;
public interface StateRepository extends JpaRepository<State, Long>{
    State findBystate(String state);
}
