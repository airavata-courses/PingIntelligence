package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto;

import java.awt.image.BufferedImage;
import java.io.File;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Photo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.User;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@RequiredArgsConstructor
@Getter
@Setter
@ToString
@Data
public class LocateAlbumDTO {
	private int id;
	private String photoname;
	private LocalDate createdAt;
    private LocalDate updatedAt;
    private String description;
    private String annotationtags;
    private Set<User> sharedwith;
//    private BufferedImage image;

}
