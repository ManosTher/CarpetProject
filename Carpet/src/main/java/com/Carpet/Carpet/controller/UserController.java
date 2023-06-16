package com.Carpet.Carpet.controller;

import com.Carpet.Carpet.exception.UserNotFoundException;
import com.Carpet.Carpet.model.City;
import com.Carpet.Carpet.model.State;
import com.Carpet.Carpet.model.User;
import com.Carpet.Carpet.repository.CityRepository;
import com.Carpet.Carpet.repository.StateRepository;
import com.Carpet.Carpet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private StateRepository stateRepository;



    @PostMapping("/user")
    User newUser(@RequestBody HashMap<String, String> requestBody) throws Exception {
        User user = userRepository.findByEmail(requestBody.get("email").toLowerCase());
        if(user != null) {
            throw new UserNotFoundException(user.getEmail());
            //return user;
        }
        User usr = new User();
        usr.setFirstName(requestBody.get("firstName"));
        usr.setLastName(requestBody.get("lastName"));
        usr.setAddress(requestBody.get("address"));
        usr.setZipCode(requestBody.get("zipCode"));
        usr.setPhoneNumber(requestBody.get("phoneNumber"));
        usr.setEmail(requestBody.get("email").toLowerCase());
        City city = cityRepository.findBycity(requestBody.get("city"));
        if(city == null) {
            City tmpCity = new City();
            tmpCity.setCity(requestBody.get("city"));
            cityRepository.save(tmpCity);
            usr.setCity(tmpCity);
        } else {
            usr.setCity(city);
        }

        State state = stateRepository.findBystate(requestBody.get("state"));
        if(state == null) {
            State tmpState = new State();
            tmpState.setState(requestBody.get("state"));
            stateRepository.save(tmpState);
            usr.setState(tmpState);
        } else {
            usr.setState(state);
        }
        return userRepository.save(usr);
    }


    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserByID(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));
    }




    @PutMapping("/user/{id}")
    User updateUser(@RequestBody HashMap<String, String> requestBody, @PathVariable Long id){
        return userRepository.findById(id)
                .map(user -> {
                    user.setFirstName(requestBody.get("firstName"));
                    user.setLastName(requestBody.get("lastName"));
                    user.setAddress(requestBody.get("address"));
                    user.setZipCode(requestBody.get("zipCode"));
                    user.setPhoneNumber(requestBody.get("phoneNumber"));
                    user.setEmail(requestBody.get("email").toLowerCase());
                    City city = cityRepository.findBycity(requestBody.get("city"));
                    if(city == null) {
                        City tmpCity = new City();
                        tmpCity.setCity(requestBody.get("city"));
                        cityRepository.save(tmpCity);
                        user.setCity(tmpCity);
                    } else {
                        user.setCity(city);
                    }
                    State state = stateRepository.findBystate(requestBody.get("state"));
                    if(state == null) {
                        State tmpState = new State();
                        tmpState.setState(requestBody.get("state"));
                        stateRepository.save(tmpState);
                        user.setState(tmpState);
                    } else {
                        user.setState(state);
                    }
                    return userRepository.save(user);
                }).orElseThrow(()->new UserNotFoundException(id));
    }


    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with "+ id + " has been deleted!";
    }
}
