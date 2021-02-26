package com.UserAuthentication.UserAuthentication.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.UserAuthentication.UserAuthentication.model.User;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findByUserId(Long userId);
}