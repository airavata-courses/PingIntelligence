package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.UserResponse;

import javax.persistence.JoinColumn;

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
@Table(name="album")
public class Album {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	private LocalDate createdAt;
    private LocalDate updatedAt;
    private int size;
    private String description;
    private int countOfPhotos = 0;
    @ElementCollection(targetClass=String.class)
    private List<String> tags;
    private String albumname;
    private String owner;
    private String sharedpriveledges = "private";
//    private List<String> userss = new ArrayList<>();
    

    @OneToMany(targetEntity = Photo.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "album_id", referencedColumnName = "id")
    private List<Photo> photos = new ArrayList<>();
    
    @Access(AccessType.PROPERTY)
    @ManyToMany(targetEntity = User.class, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(name = "ALBUM_USERS", joinColumns = { @JoinColumn(name = "album_id") }, inverseJoinColumns = { @JoinColumn(name = "user_Id") })
    private Set<User> users = new HashSet<>();
    
    


}
