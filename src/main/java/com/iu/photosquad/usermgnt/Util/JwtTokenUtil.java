package com.iu.photosquad.usermgnt.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import com.iu.photosquad.usermgnt.Entity.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtTokenUtil {

    private String SECRET_KEY  = "photosquadsecret";
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String getSecret() {
		return SECRET_KEY;
	}

	public void setSecret(String secret) {
		SECRET_KEY  = secret;
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
    	return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();    
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    public String createToken(UserDetails userdetail) {

        return Jwts.builder().setClaims(new HashMap<>()).setSubject(userdetail.getUsername()).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*10))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
