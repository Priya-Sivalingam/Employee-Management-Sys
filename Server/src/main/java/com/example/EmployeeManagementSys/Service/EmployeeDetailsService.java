package com.example.EmployeeManagementSys.Service;

import com.example.EmployeeManagementSys.model.Employee;
import com.example.EmployeeManagementSys.Repository.EmployeeRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;

@Service
public class EmployeeDetailsService implements UserDetailsService  {

    private final EmployeeRepo employeeRepository;

    // Constructor injection for the repository
    public EmployeeDetailsService(EmployeeRepo employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find employee by username
        Employee employee = employeeRepository.findByUsername(username);

        if (employee == null) {
            throw new UsernameNotFoundException("Employee not found with username: " + username);
        }

        // Return the Employee object, which now implements UserDetails
        return employee;
    }
}
