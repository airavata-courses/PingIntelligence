package com.pingintelligence.rest.webservices.restfulwebservices.Gateway;

public class GatewayBean {

	private String message;
	
	public GatewayBean(String message) {
		this.message = message;
	}
	
	public String getMessage() {
		return message;
	}

	@Override
	public String toString() {
		return "AuthenticationBean [message=" + message + "]";
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
