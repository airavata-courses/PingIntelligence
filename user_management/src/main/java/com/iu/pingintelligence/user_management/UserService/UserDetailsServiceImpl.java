package com.iu.pingintelligence.user_management.UserService;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iu.pingintelligence.user_management.Entity.UserDetails;
import com.iu.pingintelligence.user_management.UserRepo.UserRepo;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepo userRepo;
	
	public Boolean isRegistered(UserDetails userdata) {
//		System.out.print("inside userservice");
		Boolean registered = false;
		
		if(userRepo.findByEmailID(userdata.getEmailID()) != null) {
			System.out.println(userRepo.findByEmailID(userdata.getEmailID()));
			return registered;
		}
		registered = true;
		UserDetails newUser = new UserDetails();
		newUser.setUsername(userdata.getUsername());
		newUser.setPassword(userdata.getPassword());
		newUser.setFirstname(userdata.getFirstname());
		newUser.setLastname(userdata.getLastname());
		newUser.setEmailID(userdata.getEmailID());
		newUser.setLastUpdated(LocalDate.now());
		userRepo.save(newUser);
		
		return registered;
	}
}
