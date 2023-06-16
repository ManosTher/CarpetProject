package com.Carpet.Carpet.exception;

public class CityNotFoundException extends RuntimeException{
    public CityNotFoundException(Long id){
        super("City with id "+id+" could not found.");
    }
}
