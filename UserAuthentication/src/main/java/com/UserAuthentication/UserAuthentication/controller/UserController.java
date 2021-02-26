package com.UserAuthentication.UserAuthentication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.UserAuthentication.UserAuthentication.model.User;
import com.UserAuthentication.UserAuthentication.repository.UserRepository;


@RestController
public class UserController {
	
	@Autowired
    private UserRepository userRepository;

    @PostMapping("/questions")
    public User createQuestion(@RequestBody User user) {
        return userRepository.save(user);
    }
}