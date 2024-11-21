package com.example.EmployeeManagementSys.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import com.example.EmployeeManagementSys.security.Service.EmployeeDetailsService;
import org.slf4j.LoggerFactory;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${EmployeeManagement.app.jwtSecret}")
    private String jwtSecret;
    @Value("${EmployeeManagement.app.jwtExpirationMs}")
    private long jwtExpirationMs;


    public String generateToken (Authentication authentication){
        EmployeeDetailsService userPrinciple = (EmployeeDetailsService) authentication.getPrincipal();

        Date issuedAt = new Date();
        Date expirationAt = new Date(issuedAt.getTime() + jwtExpirationMs);
        // Debugging
        System.out.println("Token Issued At: " + issuedAt);
        System.out.println("Token Expiration At: " + expirationAt);

        return Jwts.builder()
                .setSubject((userPrinciple.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256).compact();
    }
    public String getUserNameFromJwtToken(String token){
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
    }
    public Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        }catch (MalformedJwtException e){
            logger.error("Invalid JWT token: {}", e.getMessage());
        }catch (ExpiredJwtException e){
            logger.error("Token is Expired: {}", e.getMessage());
        }catch (UnsupportedJwtException e){
            logger.error("JWT token is unsupported: {}", e.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
