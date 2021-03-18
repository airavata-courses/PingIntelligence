package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.ForeignKey;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

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
@Table(name="photo")
public class Photo implements Cloneable{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	private String photoname;
	private LocalDate createdAt;
    private LocalDate updatedAt;
	private int size;
    private String description;
    private String annotationtags;
    @Lob
    @Column(name = "picByte")
    private byte[] data;
    private Long albumidd;
//
//    @ManyToOne
    @Column(name="album_id")
    private Long album_id;
    
    @ManyToMany(targetEntity = User.class, cascade = { CascadeType.MERGE, CascadeType.PERSIST })
    @JoinTable(name = "PHOTO_USERS", joinColumns = { @JoinColumn(name = "photo_id") }, inverseJoinColumns = {@JoinColumn(name = "user_Id") })    
    private Set<User> users = new HashSet<>();
    

}
