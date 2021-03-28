package com.iu.photosquad.usermgnt;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

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
import com.iu.photosquad.usermgnt.Entity.LoginModel;
import com.iu.photosquad.usermgnt.Entity.UserDetails;

@RunWith(MockitoJUnitRunner.class)
public class UserManagementTest {
	
	private MockMvc mockMvc;
	
	ObjectMapper om = new ObjectMapper();
	
	@Autowired
	private WebApplicationContext context;
	
	@Before
	private void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}
	
	/**
	 * Test case to check whether user registration API is working or not
	 * @throws Exception
	 */
	
	@Test
	public void registerUserTest() throws Exception {
		UserDetails newUser = new UserDetails();
		newUser.setUsername("newuser1");
		newUser.setPassword("newuser1");
		newUser.setFirstname("newuser1");
		newUser.setLastname("newuser1");
		newUser.setEmailID("newuser1@fake.com");
		newUser.setLastUpdated(LocalDate.now());
		String jsonRequest = om.writeValueAsString(newUser);
		MvcResult result = mockMvc.perform(post("/user/signup").content(jsonRequest).content(MediaType.
				APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
		String resultContent = result.getResponse().getContentAsString();
		UserDetails response = om.readValue(resultContent, UserDetails.class);
		
		Assert.assertTrue(response.getEmailID().equals("newuser1@fake.com"));
	}
	
	/**
	 * Test case to check whether user login API is working or not with the registered user
	 * @throws Exception
	 */
	
	@Test
	public void loginUserTest() throws Exception {
		LoginModel loginUser = new LoginModel();
		loginUser.setUsername("newuser1");
		loginUser.setPassword("newuser1");
		String jsonRequest = om.writeValueAsString(loginUser);
		MvcResult result = mockMvc.perform(post("/user/login").content(jsonRequest).content(MediaType.
				APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
		String resultContent = result.getResponse().getContentAsString();
		LoginModel response = om.readValue(resultContent, LoginModel.class);
		
		Assert.assertTrue(response.getUsername().equals("newuser1"));
	}
}
