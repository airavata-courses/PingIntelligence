package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Photo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TotalAlbumsPerUser {
	private String albumname;
	private LocalDate created_at;
	private String owner;
	private List<String> sharedwith;
}
