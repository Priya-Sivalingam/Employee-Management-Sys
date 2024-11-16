package com.example.EmployeeManagementSys.Controller;

import com.example.EmployeeManagementSys.model.JwtRequest;
import com.example.EmployeeManagementSys.model.JwtResponse;
import com.example.EmployeeManagementSys.security.JWTHelper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTHelper jwtHelper;

    private final Logger logger = LoggerFactory.getLogger(AuthController.class);

    // Endpoint for login
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        // Authenticate user
        authenticateUser(request.getUsername(), request.getPassword());

        // Load user details after successful authentication
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());

        // Generate JWT token
        String token = jwtHelper.generateToken(userDetails);

        // Prepare JWT response
        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
                .username(userDetails.getUsername())
                .build();

        // Return response with status OK
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Method to authenticate the user
    private void authenticateUser(String username, String password) {
        try {
            // Create authentication token
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            authenticationManager.authenticate(authenticationToken);
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed for user: {}", username);
            throw new BadCredentialsException("Invalid username or password.");
        }
    }

    // Exception handler for BadCredentialsException
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentialsException() {
        return new ResponseEntity<>("Credentials are invalid.", HttpStatus.UNAUTHORIZED);
    }
}
