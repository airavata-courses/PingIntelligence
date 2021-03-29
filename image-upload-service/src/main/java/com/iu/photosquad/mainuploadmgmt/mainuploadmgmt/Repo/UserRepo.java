package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.User;

public interface UserRepo extends JpaRepository<User,Long>{
	User findByUsername(String username);
}
