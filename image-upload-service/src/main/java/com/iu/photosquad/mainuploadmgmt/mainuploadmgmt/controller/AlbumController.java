package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.swing.JFileChooser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.AlbumModel;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.DeleteAlbum;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.KafkaAlbumModel;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.LocateAlbumDTO;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.ShareAlbumModel;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.TotalAlbumsPerUser;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.UserResponse;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Album;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Photo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.User;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo.AlbumRepo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo.PhotoRepo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo.UserRepo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.service.RestServiceLocator;

@Controller
@CrossOrigin
@RequestMapping(path="/album")
public class AlbumController {
	
	@Autowired
	private AlbumRepo albumrepo;
	
	@Autowired
	private PhotoRepo photorepo;
	
	@Autowired
	private RestServiceLocator api;
	
	@Autowired
	private UserRepo userrepo;
	
	@Autowired
	private KafkaTemplate<String,KafkaAlbumModel> template;
	
	@Autowired
	private KafkaTemplate<String,DeleteAlbum> template1;
	
	private String topic = "test1";
	private String topic1 = "test2";
	
	@PostMapping(path="/create")
	public ResponseEntity<?> create(@RequestBody AlbumModel album) {
		HashMap<String,String> createresponse = new HashMap<>();
		try {	
			
			if(albumrepo.findByAlbumname(album.getName()) != null && album.getName().equals((String)albumrepo.findByAlbumname(album.getName()).getAlbumname())){
				createresponse.put("album", HttpStatus.ALREADY_REPORTED.toString()); 
			}
			else {
			List<String> tgs = new ArrayList<>();
			Album ab = new Album();
			ab.setCreatedAt(LocalDate.now());
			ab.setUpdatedAt(LocalDate.now());
			ab.setSize(0);
		    ab.setDescription(album.getDescription());
		    ab.setCountOfPhotos(0);
		    ab.setTags(tgs);
		    ab.setAlbumname(album.getName());
		    ab.setSharedpriveledges(album.getSharedpriveledges());
		    ab.setPhotos(new ArrayList<>());
//		    List<String> lt = new ArrayList<>();
		    User u = findOrAddUser(album.getOwner());
//		    lt.add(album.getOwner());
		    ab.setOwner(u.getUsername());
		    
		    albumrepo.save(ab);
		    createresponse.put("album", "created");
			}
		}
		catch(Exception e){
			createresponse.put("album", "exception came");
		}
		return ResponseEntity.ok(createresponse);
	}
	
	@PostMapping(path = "/upload")
	public ResponseEntity<?> createNewObjectWithImage(@RequestParam("files") byte[] files,
		      @RequestParam("albumname") String albumname,
//		      ,@RequestParam("sharedusers") List<String> users,
		      @RequestParam("photoname") String photoname) throws Exception {

//		System.out.println(files.toString());
		
		Set<Photo> photoset = new HashSet<>();
		List<Photo> kafkaphotos = new ArrayList<>();
		int count = 0;
//		for(MultipartFile mf : files) {
			Photo pic = new Photo();
			pic.setPhotoname(photoname);
			pic.setAlbum_id(albumrepo.findByAlbumname(albumname).getId());
			pic.setAnnotationtags("hello1");
			pic.setCreatedAt(LocalDate.now());
			pic.setDescription("hello2");
			pic.setSize(0);
			pic.setUpdatedAt(LocalDate.now());
			pic.setAnnotationtags(photoname);
//			System.out.println(files);
			pic.setData(files);
			photoset.add(pic);
			kafkaphotos.add(pic);
//			count++;
//		}

		List<String> usernames = new ArrayList<>();
		
		Set<User> albumusers = new HashSet<User>();
		
//		for(String incominguser : users) {
//			if(userrepo.findByUsername(incominguser) != null) {
//				
//				albumusers.add(userrepo.findByUsername(incominguser));
//			}
//			else {
//				
//				usernames.add(incominguser);
//			}
//		}
//		if(!usernames.isEmpty()) {
//			
//			List<UserResponse> lt = api.getUsersFromUserMgmtDB(usernames);
//			
//			for (UserResponse u : lt) {
//				if(userrepo.findByUsername(u.getUsername()) != null) {
//					User ul = userrepo.findByUsername(u.getUsername());
//					albumusers.add(ul);
//				}
//				HashSet<Album> hs = new HashSet<>();
//				hs.add(albumrepo.findByAlbumname(albumname));
//				User newuser = new User();
//				newuser.setId(u.getId());
//				newuser.setFirstname(u.getFirstname());
//				newuser.setLastname(u.getLastname());
//				newuser.setEmailID(u.getEmailID());
//				newuser.setPassword(u.getPassword());
//				newuser.setUsername(u.getUsername());
//				newuser.setLastUpdated(u.getLastUpdated());
//				newuser.setAlbums(hs);
//				userrepo.save(newuser);
//				albumusers.add(userrepo.findByUsername(u.getUsername()));
//				}
//		}
		Album parentalbum = albumrepo.findByAlbumname(albumname);

//		if(parentalbum.getUsers() != null) {
//			parentalbum.getUsers().addAll(albumusers);
//		}
//		else {
//			Set<User> st = new HashSet<User>(); 
//		    st.addAll(albumusers);
//		    parentalbum.setUsers(st);
//		}
		
//		parentalbum.getUsers().addAll(albumusers);
		parentalbum.getPhotos().addAll(photoset);

		
		albumrepo.save(parentalbum);
		Album albs = albumrepo.findByAlbumname(parentalbum.getAlbumname());
		
		KafkaAlbumModel kam = new KafkaAlbumModel();
		kam.setPhotos(kafkaphotos);
		kam.setAlbumname(albumname);
		template.send(topic,"test1",kam);
		System.out.println("album sent to google");
		return ResponseEntity.ok("200");
	}
	
	@GetMapping(path="/getphotos")
	public ResponseEntity<?> findAlbumPhotos(@RequestParam String albumname) {
		HashMap<String,List<Photo>> singlealbumresponse = new HashMap<>();

		Album ab = albumrepo.findByAlbumname(albumname);
		singlealbumresponse.put("photos", ab.getPhotos());
		return ResponseEntity.ok(singlealbumresponse);
		
	}
	
	@GetMapping(path="/locatealbum")
	public ResponseEntity<?> findonealbum(@RequestParam String albumname) {
		HashMap<String,List<LocateAlbumDTO>> singlealbumresponse = new HashMap<>();
		try {
				Album u = albumrepo.findByAlbumname(albumname);
//				System.out.println(u);
				List<LocateAlbumDTO> la = new ArrayList<>();
				List<Photo> allphotos = u.getPhotos();
				for(Photo p : allphotos) {
					LocateAlbumDTO ladt = new LocateAlbumDTO();
					ladt.setId(p.getId());
					ladt.setAnnotationtags(p.getAnnotationtags());
					ladt.setCreatedAt(p.getCreatedAt());
					ladt.setUpdatedAt(p.getUpdatedAt());
					ladt.setPhotoname(p.getPhotoname());
					ladt.setDescription(p.getDescription());
					ladt.setSharedwith(p.getUsers());
//					BufferedImage bImage = ImageIO.read(new File(p.getPhotoname() +".jpg"));
//				    ByteArrayOutputStream bos = new ByteArrayOutputStream();
//				    ImageIO.write(bImage, "jpg", bos );
//				    byte [] data = bos.toByteArray();
//				    ByteArrayInputStream bis = new ByteArrayInputStream(data);
//				    BufferedImage bImage2 = ImageIO.read(bis);
//				    ImageIO.write(bImage2, "jpg", new File("output.jpg") );
//					ladt.setImage(bImage2);
					la.add(ladt);
				}

				singlealbumresponse.put("albums", la);
//			}
		}
		catch(Exception e){
			e.getStackTrace();
		}
		return ResponseEntity.ok(singlealbumresponse);
		
	}
	
	@GetMapping(path="/allalbums")
	public ResponseEntity<?> allalbums(@RequestParam String username) {
		HashMap<String,List<TotalAlbumsPerUser>> allalbumresponse = new HashMap<>();
		try {
		
			List<TotalAlbumsPerUser> u = new ArrayList<TotalAlbumsPerUser>();
			
			List<Album> allalbums = albumrepo.findAll();
//			System.out.println(allalbums);
			
			List<Album> als = new ArrayList<>();
			for(Album i : allalbums) {
				for(User u1 : i.getUsers()) {
					if(u1.getUsername().equals(username)) {
						als.add(i);
					}
				}
			}
			
//			System.out.println(als.size());
			
//			
			
			User u1 = userrepo.findByUsername(username);

			List<Album> albs = albumrepo.findByOwner(username);
			
			als.addAll(albs);

			for(Album al : als) {
				TotalAlbumsPerUser tau = new TotalAlbumsPerUser();
				tau.setAlbumname(al.getAlbumname());
				tau.setCreated_at(al.getCreatedAt());
				List<String> lt = new ArrayList<>();
				lt.add(al.getOwner());
				tau.setOwner(al.getOwner());
				List<String> userss = new ArrayList<>();
				for(User u2 : al.getUsers()) {
					userss.add(u2.getUsername());
				}
				tau.setSharedwith(userss);
				u.add(tau);
			}

				allalbumresponse.put("albums", u);
				return ResponseEntity.ok(allalbumresponse);

		}
		catch(Exception e){
			e.getStackTrace();
		}
		return ResponseEntity.ok(allalbumresponse);
		
	}

	@GetMapping(path="/allusers")
	public ResponseEntity<?> listusers() {
		HashMap<String,List<User>> usersresponse = new HashMap<>();
		try {
			List<User> u = userrepo.findAll();
			if(u != null || (u instanceof User)) {
				
				usersresponse.put("users", u);
			}
		}
		catch(Exception e){
			e.getStackTrace();
		}
		return ResponseEntity.ok(usersresponse);
		
	}

	public User findOrAddUser(String username) throws Exception {
		User newuser = new User();
		if(userrepo.findByUsername(username) != null) {
			User u = userrepo.findByUsername(username);
			return u;
		}
		else {
			List<String> lt = new ArrayList<>();
			lt.add(username);
			List<UserResponse> lt1 = api.getUsersFromUserMgmtDB(lt);
			for(UserResponse rs : lt1) {
//				System.out.println("rs" + rs);
				newuser.setId(rs.getId());
				newuser.setFirstname(rs.getFirstname());
				newuser.setLastname(rs.getLastname());
				newuser.setEmailID(rs.getEmailID());
				newuser.setPassword(rs.getPassword());
				newuser.setUsername(rs.getUsername());
				newuser.setLastUpdated(rs.getLastUpdated());
				userrepo.save(newuser);
				return userrepo.findByUsername(newuser.getUsername());
			}
			return null;
		}
		
	}
//	
	@PostMapping(path="/share")
	public ResponseEntity<?> share(@RequestBody ShareAlbumModel sam) throws Exception {
		HashMap<String,Album> shareresponse = new HashMap<>();
		Album abs = albumrepo.findByAlbumname(sam.getAlbumname());
//		Set<Album> sa = new HashSet<>();
		Set<Album> lt = new HashSet<>();
		Set<User> lt2 = new HashSet<>();
			if(abs != null){
				List<String> usernames = sam.getUsernames();
//				System.out.println(usernames);
			
//				lt.add(abs);
				for(String um : usernames) {
					User u1 = findOrAddUser(um);
					lt2.add(u1);
				}
				
				
				if(abs.getUsers() == null) {
					abs.setUsers(lt2);;
				}
				else {
					Set<User> st = abs.getUsers();
					for(User um : lt2) {
						st.add(um);
					}
					abs.setUsers(st);
				}
				
				
				albumrepo.save(abs);
				
//				
//	
//				
//				
//				for(String u : sam.getUsernames()) {
//					User urep = userrepo.findByUsername(u);
//					urep.getAlbums().add(abs);
//					userrepo.save(urep);
//				}

//				Set<User> s3 = abs.getUsers();
//				System.out.println(lt2.size());
//				for(User u1 : s3) {
//					lt2.add(u1);
//				}
//				System.out.println(lt2.size());
////				abs.setUsers(lt2);
//				for(String um1 : usernames) {
//					User u2 = findOrAddUser(um1);
//					lt2.add(u2);
//				}
//				Album abs1 = albumrepo.findByAlbumname(sam.getAlbumname());
//				System.out.println(abs1.getUsers().size());
////				User u3 = userrepo.findByUsername("test5");
////				abs1.setUsers(s3);
//				System.out.println(lt2.size());
//				abs1.setUsers(lt2);
////				System.out.println(lt2.size());
//				albumrepo.save(abs1);
//				Album abs1 = albumrepo.findByAlbumname(sam.getAlbumname());
//				System.out.println(abs.getUsers().size());
//		
			}
			
//			for(User u : lt2) {
//				if(u.getAlbums() == null) {
//					HashSet<Album> ltq = new HashSet<>();
//					ltq.add(abs);
//					u.setAlbums(ltq);
//				}
//				else {
//					u.getAlbums().add(abs);
//				}
//				userrepo.save(u);
//			}
			
			
			return ResponseEntity.ok("200");
	}
	
	@PostMapping(path="/delete")
	public ResponseEntity<?> deleteAlbum(@RequestBody DeleteAlbum da) {
//		System.out.println(albumname);
		Album alb = albumrepo.findByAlbumname(da.getAlbumname());
		DeleteAlbum albumdata = new DeleteAlbum();
		albumdata.setAlbumname(alb.getAlbumname());
		template1.send("test2", albumdata);
		System.out.println("delete album data sent");
		albumrepo.delete(alb);
		return ResponseEntity.ok("200");
	}
	
//	@GetMapping(path="/download")
////	public ResponseEntity<?> download(@RequestParam String ) throws FileNotFoundException{
////
////
////		Album ab = albumrepo.findByAlbumname(albumname);
////		
//
////		File someFile = new File("someFile.zip");
////		final JFileChooser fc = new JFileChooser();
////
////		File files[] = fc.getSelectedFiles();
////		BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(someFile));
////		
////		// Create the ZIP file first
////		try (ZipOutputStream out = new ZipOutputStream(bos)) {
////		    // Write files/copy to archive
////		    for (Photo file : ab.getPhotos()) {
////		        // Put a new ZIP entry to output stream for every file
////		        out.putNextEntry(new ZipEntry(Base64.getEncoder().encodeToString(file.getData())));
////		        Files.copy("/Downloads", out);
////		        out.closeEntry();
////		    }
////		}
//
//	     return ResponseEntity.ok()
//	             .contentType(MediaType.parseMediaType("image/jpg"))
//	             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + "hello.jpg" + "\"")
//	             .body(new ByteArrayResource(ab.getPhotos().get(0).getData()));
//
//	
//}
	
	
		

	
}
