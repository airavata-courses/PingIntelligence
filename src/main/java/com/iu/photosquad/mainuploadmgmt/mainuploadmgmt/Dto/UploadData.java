package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
public class UploadData {
	private String albumname;
	private String photoname;
	private List<String> sharedusers;
	private String files;
}
