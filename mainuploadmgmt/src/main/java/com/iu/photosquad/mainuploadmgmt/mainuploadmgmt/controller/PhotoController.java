package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.controller;

import java.io.FileNotFoundException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.AlbumModel;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Album;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Photo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo.AlbumRepo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo.PhotoRepo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo.UserRepo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.service.RestServiceLocator;

@Controller
@CrossOrigin
@RequestMapping(value="/photo")
public class PhotoController {
	@Autowired
	private AlbumRepo albumrepo;
	
	@Autowired
	private PhotoRepo photorepo;
	
	@Autowired
	private RestServiceLocator api;
	
	@Autowired
	private UserRepo userrepo;
	
	@PostMapping(path = "/uploadphotos")
	public ResponseEntity<?> createNewObjectWithImage1(@RequestParam("files") MultipartFile[] files,
		      @RequestParam("albumname") String albumname) throws Exception {

		
		Set<Photo> photoset = new HashSet<>();
		
		for(MultipartFile mf : files) {
			Photo pic = new Photo();
			pic.setPhotoname("photoname");
//			pic.setId((int) Math.random());
			pic.setAlbum_id(albumrepo.findByAlbumname(albumname).getId());
			pic.setAnnotationtags("hello");
			pic.setCreatedAt(LocalDate.now());
			pic.setDescription("hello");
			pic.setSize(0);
			pic.setUpdatedAt(LocalDate.now());
			pic.setData(mf.getBytes());
//			photoset.add(pic);
			photorepo.save(pic);
			
		}

		return ResponseEntity.ok("200");
	}
	
	@GetMapping(path="/download")
	public ResponseEntity<?> share(@RequestParam int ids) throws FileNotFoundException{
		Photo ab = photorepo.findById(ids);

	     return ResponseEntity.ok()
	             .contentType(MediaType.parseMediaType("image/png"))
	             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "hello.png" + "\"")
	             .body(new ByteArrayResource(ab.getData()));

	}
}
