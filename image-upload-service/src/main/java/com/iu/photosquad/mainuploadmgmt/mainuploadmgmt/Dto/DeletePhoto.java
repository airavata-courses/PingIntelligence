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
public class DeletePhoto {
	private int photo_id;
	private String albumname;
}
