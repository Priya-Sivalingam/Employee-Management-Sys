package jwt.Employee.Management.System.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import jwt.Employee.Management.System.security.services.UserDetailsImpl;
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

    public String generateToken(Authentication authentication){
        UserDetailsImpl userPrinciple = (UserDetailsImpl) authentication.getPrincipal();

        Date issuedAt = new Date();
        Date expirationAt = new Date(issuedAt.getTime() + jwtExpirationMs);

        logger.info("Token Issued At: {}", issuedAt);
        logger.info("Token Expiration At: {}", expirationAt);

        return Jwts.builder()
                .setSubject(userPrinciple.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expirationAt)
                .signWith(SignatureAlgorithm.HS256, jwtSecret) // Ensure your jwtSecret is a proper Base64 encoded string
                .compact();
    }

    public String getUserNameFromJwtToken(String token){
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)); // Ensure base64 encoded jwtSecret
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Token is Expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
