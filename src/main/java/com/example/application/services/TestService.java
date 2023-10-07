package com.example.application.services;
import org.springframework.stereotype.Service;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;

@BrowserCallable
@AnonymousAllowed
@Service
public class TestService{

    public String helloWorld(){
        return "Hello World";
    }
    
}