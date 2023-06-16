package com.Carpet.Carpet.exception;

public class StateNotFoundException extends RuntimeException{
    public StateNotFoundException(Long id){
        super("State with id "+id+" could not found.");
    }
}

