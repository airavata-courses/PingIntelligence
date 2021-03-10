package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto;

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
public class AlbumModel {
	private String name;
	private String description;
	private String sharedpriveledges;
	private String owner;
}
