package com.iu.photosquad.usermgnt.Entity;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.boot.jackson.JsonComponent;

import com.fasterxml.jackson.annotation.JsonFilter;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@Entity
@Getter
@Setter
@ToString
@JsonComponent
//@Data
public class UserInfo {
	public UserInfo(List<String> username) {
			super();
			this.username = username;
		}

	public UserInfo() {
		
	}

	//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long Id;
//	@ElementCollection(targetClass=String.class)
	private List<String> username;
}
