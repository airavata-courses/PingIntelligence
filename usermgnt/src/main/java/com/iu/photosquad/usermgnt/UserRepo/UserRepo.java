package com.iu.photosquad.usermgnt.UserRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iu.photosquad.usermgnt.Entity.UserDetails;

public interface UserRepo extends JpaRepository<UserDetails,Long> {

	UserDetails findByUsername(String username);
	String findByEmailID(String emailID);
}
