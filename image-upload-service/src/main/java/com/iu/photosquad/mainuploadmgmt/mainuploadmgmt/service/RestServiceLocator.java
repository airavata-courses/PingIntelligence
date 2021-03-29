package com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.service;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.UserInfo;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Dto.UserResponse;
import com.iu.photosquad.mainuploadmgmt.mainuploadmgmt.Entity.User;

@Component         
public class RestServiceLocator extends RestTemplate {
	
	@Autowired
	private RestTemplate restTemplate;
	 
	HttpHeaders headers = null;
	ObjectMapper mapper = null;
	String result = null;
	@PostConstruct
	public void init() {
		headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
	}
    
	public List<UserResponse> getUsersFromUserMgmtDB(List<String> list) throws Exception
    {
        final String uri = "http://user-mgmt:8091/user/find";
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        System.out.println("list" + list);
        UserInfo um = new UserInfo();
        um.setUsername(list);
        
        System.out.println("list" + um);
        String jsonreq = gson.toJson(um);
//        String jsonreq = mapper.writeValueAsString(um);
        
        System.out.println("list" + jsonreq);

        HttpEntity<String> entity = new HttpEntity<String>(jsonreq,headers);
               
        result = restTemplate.postForEntity(uri, entity, String.class).getBody();
//        Gson gson1 = new Gson();
//        JsonParser jsonParser = new JsonParser();
//        JsonArray jsonArray = (JsonArray) jsonParser.parse(result);
//        System.out.println(jsonArray);
        Gson gson1 = new Gson();
        Type type = new TypeToken<List<UserResponse>>(){}.getType();
        List<UserResponse> contactList = gson.fromJson(result, type);
        System.out.println("contactList " + contactList);
		return contactList;
         
        //Use the result
    }
}

