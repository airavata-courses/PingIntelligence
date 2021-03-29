package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Album;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Photo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.User;


public interface AlbumRepo extends JpaRepository<Album,String>{
	
	Album findByAlbumname(String albumname);
//	Optional<Album> findById(Long id);
	void save(Photo pic);

//	List<Album> findByUser(User u);
	
	List<Album> findByOwner(String owner);
	
//	@Query(value = "select a.id from album a INNER JOIN user u where u.Id = ?1",nativeQuery = true)
//	List<Album> FindAllWithDescriptionQuery(Long user_id );

	
}
