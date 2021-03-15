package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
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
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.DeleteAlbum;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.DeletePhoto;
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
	
	@Autowired
	private KafkaTemplate<String,DeleteAlbum> template1;
	
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
	public ResponseEntity<?> download(@RequestParam int ids) throws FileNotFoundException{
		Photo ab = photorepo.findById(ids);
		byte[] encoded = Base64.getEncoder().encode(ab.getData());
		return ResponseEntity.ok(ab.getData());

//	     return ResponseEntity.ok()
//	             .contentType(MediaType.parseMediaType("image/jpeg"))
//	             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + (ab.getPhotoname() +  Math.random())+ "\"")
//	             .body(new ByteArrayResource(ab.getData()));

	}
	
	@PostMapping(path="/multipledownloads")
	public ResponseEntity<?> getArticleImage(@RequestParam("postss") List<Integer> id) throws IOException {
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
	    BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(byteArrayOutputStream);
	    ZipOutputStream zipOutputStream = new ZipOutputStream(bufferedOutputStream);

		List<byte[]> lb = new ArrayList<byte[]>();
		int count = 0;
		for(int i : id) {
			Photo pic = photorepo.findById(i);
			zipOutputStream.putNextEntry(new ZipEntry(pic.getPhotoname() + count++));
			InputStream myInputStream = new ByteArrayInputStream(pic.getData()); 

	        BufferedInputStream fileInputStream = new BufferedInputStream(myInputStream);

	        IOUtils.copy(fileInputStream, zipOutputStream);

	        fileInputStream.close();
	        zipOutputStream.closeEntry();
		}
		IOUtils.closeQuietly(bufferedOutputStream);
	    IOUtils.closeQuietly(byteArrayOutputStream);
	    
	    
		
	    return new ResponseEntity<byte[]>(byteArrayOutputStream.toByteArray(), HttpStatus.ACCEPTED);
	}
	
	@GetMapping(path="/open")
	public ResponseEntity<?> viewPhoto(@RequestParam("ids") int ids){
		Photo ab = photorepo.findById(ids);
		return ResponseEntity.ok()
	             .contentType(MediaType.parseMediaType("image/jpeg"))
	             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + (ab.getPhotoname() +  Math.random())+ "\"")
	             .body(new ByteArrayResource(ab.getData()));
	}
	
	@PostMapping(path="/delete")
	public ResponseEntity<?> deletePhoto(@RequestBody DeletePhoto da) {
//		System.out.println(albumname);
		Photo pic = photorepo.findById(da.getPhoto_id());
		DeleteAlbum albumdata = new DeleteAlbum();
		albumdata.setAlbumname(da.getAlbumname() + "|" + pic.getPhotoname());
		System.out.println(albumdata.getAlbumname());
		template1.send("test2", albumdata);
		photorepo.delete(pic);
		return ResponseEntity.ok("200");
	}
	
	// public ResponseEntity<?> sharePhoto(@RequestBody SharePhotoModel spm ){
	
	// 	return ResponseEntity.ok("200");
	// }
}
