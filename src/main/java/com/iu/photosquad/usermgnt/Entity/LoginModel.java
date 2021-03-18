package com.iu.photosquad.usermgnt.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@ToString
@Data
public class LoginModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long Id;

	private String username;

	private String password;
}
