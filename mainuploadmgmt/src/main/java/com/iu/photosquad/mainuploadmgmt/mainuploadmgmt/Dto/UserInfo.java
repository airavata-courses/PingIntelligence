package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.User;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class UserInfo {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long Id;
//	@ElementCollection(targetClass=String.class)
	private List<String> username;
	public UserInfo() {
		
	}
	public UserInfo(List<String> username) {
		super();
		this.username = username;
	}
}
