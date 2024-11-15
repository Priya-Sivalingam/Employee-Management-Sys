package employeemanagementsys.example.employeemanagementsys.security;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtUtil {

    private String secretKey = "your_jwt_secret_key";
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
    public boolean validateToken(String token, String username) {
        return username.equals(getUsernameFromToken(token)) && !isTokenExpired(token);
    }
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }
    private boolean isTokenExpired(String token) {
        return getClaimsFromToken(token).getExpiration().before(new Date());
    }
    private Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }
}
