package jwt.Employee.Management.System.payload.response;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type ="Bearer";
    private Long id;
    private String username;
    private List<String>roles;

    public JwtResponse(String token, List<String> roles, String username, Long id) {
        this.token = token;
        this.roles = roles;
        this.username = username;
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
