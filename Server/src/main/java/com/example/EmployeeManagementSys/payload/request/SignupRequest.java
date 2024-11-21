package jwt.Employee.Management.System.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Data
public class SignupRequest {

    @Setter
    @Getter
    @NotBlank
    @Size(max = 50)
    @Email
    private String username;
    @Getter
    @Setter
    private Set<String> role;
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    public  String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
