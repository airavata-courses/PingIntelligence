package com.pingintelligence.rest.webservices.restfulwebservices.jwt;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<JwtUserDetails, String> {

  public JwtUserDetails findByUsername(String username);

}