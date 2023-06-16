package com.Carpet.Carpet.controller;

import com.Carpet.Carpet.exception.CityNotFoundException;
import com.Carpet.Carpet.model.City;
import com.Carpet.Carpet.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @PostMapping("/city")
    City newCity(@RequestBody City newCity){
        return cityRepository.save(newCity);
    }


    @GetMapping("/cities")
    List<City> getAllCities(){
        return cityRepository.findAll();
    }

    @GetMapping("/cities/{id}")
    City getCitiesByID(@PathVariable Long id){
        return cityRepository.findById(id)
                .orElseThrow(()->new CityNotFoundException(id));
    }


    @PutMapping("/cities/{id}")
    City updateCities(@RequestBody City newCity, @PathVariable Long id){
        return cityRepository.findById(id)
                .map(cities -> {
                    cities.setCity(newCity.getCity());
                    return cityRepository.save(cities);
                }).orElseThrow(()->new CityNotFoundException(id));
    }

    @DeleteMapping("/cities/{id}")
    String deleteCity(@PathVariable Long id){
        if(!cityRepository.existsById(id)){
            throw new CityNotFoundException(id);
        }
        cityRepository.deleteById(id);
        return "City with "+ id + " has been deleted!";
    }
}
