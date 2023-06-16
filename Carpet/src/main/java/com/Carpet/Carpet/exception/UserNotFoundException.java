package com.Carpet.Carpet.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("User with id "+id+" could not found.");
    }
    public UserNotFoundException(String email){
        super("User with the " + email +" email already exist.");
    }
}
