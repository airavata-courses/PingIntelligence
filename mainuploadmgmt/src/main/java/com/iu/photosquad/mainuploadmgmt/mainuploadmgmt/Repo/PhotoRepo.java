package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Photo;

public interface PhotoRepo extends JpaRepository<Photo,Long>{
	List<Photo> findByPhotoname(String photoname);
	
//	Photo findTop1ByOrderByIdDesc();
	
	Photo findById(int id);
	
//	List<Photo> findByAlbum(String album);
}
