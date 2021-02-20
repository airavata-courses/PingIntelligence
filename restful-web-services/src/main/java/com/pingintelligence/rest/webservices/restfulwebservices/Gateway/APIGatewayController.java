package com.pingintelligence.rest.webservices.restfulwebservices.Gateway;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

// Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class APIGatewayController {
	
	@GetMapping(path = "/gateway")
	public String helloWorld() {
		return "Hello World";
	}

	@GetMapping(path = "/gateway-bean")
	public GatewayBean helloWorldBean() {
		return new GatewayBean("Hello World");
	}
	
	// gateway-bean 
	@GetMapping(path = "/gateway/path-variable/{name}")
	public GatewayBean GatewayPathVar(@PathVariable String name) {
		return new GatewayBean("Hello World, " + name);
	}
}
