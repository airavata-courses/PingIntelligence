package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.DeleteAlbum;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.Album;

@RunWith(MockitoJUnitRunner.class)
public class MainUploadManagementTest {
private MockMvc mockMvc;
	
	ObjectMapper om = new ObjectMapper();
	
	@Autowired
	private WebApplicationContext context;
	
	@Before
	private void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}
	

	@Test
	public void createAlbumTest() throws Exception {
		List<String> tgs = new ArrayList<>();
		Album myalb = new Album();
		myalb.setCreatedAt(LocalDate.now());
		myalb.setUpdatedAt(LocalDate.now());
		myalb.setSize(0);
		myalb.setDescription("wowAlbum");
		myalb.setCountOfPhotos(0);
		myalb.setTags(tgs);
		myalb.setAlbumname("wowAlbum");
		myalb.setSharedpriveledges("public");
		myalb.setPhotos(new ArrayList<>());
		myalb.setOwner("newuser");
		String jsonRequest = om.writeValueAsString(myalb);
		MvcResult result = mockMvc.perform(post("/album/create").content(jsonRequest).content(MediaType.
				APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
		String resultContent = result.getResponse().getContentAsString();
		Album response = om.readValue(resultContent, Album.class);
		
		Assert.assertTrue(response.getAlbumname().equals("wowAlbum"));
	}
	
	@Test
	public void deleteAlbumTest() throws Exception {
		DeleteAlbum albumdata = new DeleteAlbum();
		albumdata.setAlbumname("wowAlbum");
		String jsonRequest = om.writeValueAsString(albumdata);
		MvcResult result = mockMvc.perform(post("/album/delete").content(jsonRequest).content(MediaType.
				APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
		String resultContent = result.getResponse().getContentAsString();
		String response = om.readValue(resultContent, String.class);
		Assert.assertTrue(response.equals("200"));
	}
	
	
}
