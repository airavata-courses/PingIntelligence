package com.pingintelligence.rest.basic.auth;

public class AuthenticationBean {

	private String message;
	
	public AuthenticationBean(String message) {
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
