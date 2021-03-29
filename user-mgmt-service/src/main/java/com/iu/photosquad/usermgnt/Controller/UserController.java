package com.iu.photosquad.usermgnt.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.iu.photosquad.usermgnt.Entity.AuthModel;
import com.iu.photosquad.usermgnt.Entity.LoginModel;
import com.iu.photosquad.usermgnt.Entity.UserDetails;
import com.iu.photosquad.usermgnt.Entity.UserInfo;
import com.iu.photosquad.usermgnt.UserRepo.UserRepo;
import com.iu.photosquad.usermgnt.UserService.UserDetailsServiceImpl;
import com.iu.photosquad.usermgnt.Util.JwtTokenUtil;

@RestController
@CrossOrigin
@RequestMapping(path="/user")
public class UserController {
	
	public static String JWT_TOKEN = "photosquadtoken";
	
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private UserDetailsServiceImpl userService;
	@Autowired
	private JwtTokenUtil jwtservice;
	
	@PostMapping(path="/login")
	public ResponseEntity<?> login(@RequestBody LoginModel userdetails) {
		System.out.println(userdetails.toString());
		HashMap<String,String> loginresponse = new HashMap<>();
		try {
			UserDetails u = userRepo.findByUsername(userdetails.getUsername());
			if(u != null || (u instanceof UserDetails)) {
				loginresponse.put(JWT_TOKEN,jwtservice.createToken(u));
				loginresponse.put("username", u.getUsername());
			}
		}
		catch(Exception e){
			loginresponse.put("username", HttpStatus.NOT_FOUND.toString());
		}
		return ResponseEntity.ok(loginresponse);
		
	}
	
	@PostMapping(path="/signup")
	public ResponseEntity<?> signup(@RequestBody UserDetails userdetails) {
		System.out.println("inside signup");
		HashMap<String,String> signupresponse = new HashMap<>();
        try {

            Boolean u = userService.isRegistered(userdetails);
            if(u == true) {
            	signupresponse.put(JWT_TOKEN,jwtservice.createToken(userdetails));
            	signupresponse.put("isRegistered", HttpStatus.CREATED.toString());
            }
            else {
            	signupresponse.put("isRegistered", HttpStatus.ALREADY_REPORTED.toString());
            }
        }catch (Exception e){
        	signupresponse.put("isRegistered", HttpStatus.BAD_REQUEST.toString());
        }
        return ResponseEntity.ok(signupresponse);
    }
		
	@RequestMapping(value = "/verify",method = RequestMethod.POST,consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<?> verify(AuthModel secret) {
        HashMap<String, String> verifyresponse = new HashMap<>();
        String jwt_token = secret.getSecret().substring(7);
        System.out.println(jwt_token);
        String userName = jwtservice.extractUsername(jwt_token);
        
        System.out.println(userName);
        if(userRepo.findByUsername(userName) != null) {
        	verifyresponse.put("username", userName);
            return ResponseEntity.ok(verifyresponse);
        }
        verifyresponse.put("username", userRepo.findByUsername(userName).toString());
        return ResponseEntity.ok(verifyresponse);
    }
	
	
	@RequestMapping(value = "/logout")
    public ResponseEntity<?> logout() {
		HashMap<String, String> logoutresponse = new HashMap<>();
		logoutresponse.put("jwt_token", "");

        return ResponseEntity.ok(logoutresponse);
    }
	
	@PostMapping(value = "/find")
    public ResponseEntity<String> findUser(@RequestBody UserInfo ums) {
//		HashMap<String, List<UserDetails>> userresponse = new HashMap<>();
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		
		List<UserDetails> users = new ArrayList<>();
		for(String s : ums.getUsername()) {
			UserDetails user = userRepo.findByUsername(s);
			if(user != null) {
				users.add(user);
			}
		}
		String json = gson.toJson(users);
//		userresponse.put("username",users);
        return ResponseEntity.ok(json);
    }
	
}

