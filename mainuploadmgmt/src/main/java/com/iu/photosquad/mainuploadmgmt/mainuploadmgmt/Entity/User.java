package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity;




import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="user")
	public class User {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		@Column(name = "Id")
		private Long Id;
		private String username;
		private String password;
		private String firstname;
		private String lastname;
		private String emailID;
		private LocalDate lastUpdated;
		
		@ManyToMany(targetEntity = Album.class,cascade = CascadeType.ALL )
		private Set<Album> albums;
		
		@ManyToMany(targetEntity = Photo.class,cascade = CascadeType.ALL )
		private Set<Photo> photos;
		


	}

