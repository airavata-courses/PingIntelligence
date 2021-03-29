package com.iu.photosquad.usermgnt.Entity;

import java.time.LocalDate;

import javax.persistence.*;

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
@Table(name="USER_DETAILS")
public class UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long Id;

	private String username;

	private String password;

	private String firstname;

	private String lastname;

	private String emailID;

	private LocalDate lastUpdated;
	
}
