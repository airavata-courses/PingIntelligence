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
//@AllArgsConstructor
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
		
		@ManyToMany(targetEntity = Album.class,cascade = CascadeType.MERGE )
		private Set<Album> albums = new HashSet<>();
		
		@ManyToMany(targetEntity = Photo.class,cascade = CascadeType.MERGE )
		private Set<Photo> photos = new HashSet<>();

		public User(Long id, String username, String password, String firstname, String lastname, String emailID,
				LocalDate lastUpdated, Set<Album> albums, Set<Photo> photos) {
			super();
			Id = id;
			this.username = username;
			this.password = password;
			this.firstname = firstname;
			this.lastname = lastname;
			this.emailID = emailID;
			this.lastUpdated = lastUpdated;
			this.albums = albums;
			this.photos = photos;
		}
		
		

	}

