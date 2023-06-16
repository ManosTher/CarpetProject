package com.Carpet.Carpet.repository;

import com.Carpet.Carpet.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CityRepository extends JpaRepository<City, Long>{
    City findBycity(String city);
}
