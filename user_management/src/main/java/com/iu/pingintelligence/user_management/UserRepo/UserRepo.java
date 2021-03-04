package com.iu.pingintelligence.user_management.UserRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iu.pingintelligence.user_management.Entity.UserDetails;

public interface UserRepo extends JpaRepository<UserDetails,Long> {

	UserDetails findByUsername(String username);
	String findByEmailID(String emailID);
}
