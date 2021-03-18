package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto;

import java.util.ArrayList;
import java.util.List;

import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Photo;

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
public class KafkaAlbumModel {
	private List<Photo> photos = new ArrayList<>();
	private String albumname;
}
