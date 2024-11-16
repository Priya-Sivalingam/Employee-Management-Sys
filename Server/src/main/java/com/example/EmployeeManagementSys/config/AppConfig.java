package com.example.EmployeeManagementSys.config;

import com.example.EmployeeManagementSys.Service.EmployeeService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;


import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class AppConfig {
    private final EmployeeService employeeService;

    public AppConfig(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        List<UserDetails> users = employeeService.getAllEmployees().stream()
                .map(user -> org.springframework.security.core.userdetails.User.builder()
                        .username(user.getUsername())
                        .password(passwordEncoder().encode(user.getPassword()))
                        .build())
                .collect(Collectors.toList());

        return new InMemoryUserDetailsManager(users);
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
}
