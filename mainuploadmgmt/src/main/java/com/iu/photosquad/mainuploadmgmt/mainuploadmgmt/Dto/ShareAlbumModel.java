package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto;

import java.util.List;

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
public class ShareAlbumModel {
	private String albumname;
	private List<String> usernames;

}