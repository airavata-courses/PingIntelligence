package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto;

import java.time.LocalDate;

import javax.persistence.*;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class UserResponse {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long Id;

	private String username;

	private String password;

	private String firstname;

	private String lastname;

	private String emailID;

	private LocalDate lastUpdated;
	
}
