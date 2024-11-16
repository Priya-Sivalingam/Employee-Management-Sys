package com.example.EmployeeManagementSys.Controller;


import com.example.EmployeeManagementSys.model.Employee;
import com.example.EmployeeManagementSys.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees") // Base path for all employee-related routes
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    // Create a new employee
    @PostMapping
    public ResponseEntity<String> createEmployee(@RequestBody Employee employee) {
        employeeService.createEmployee(employee);
        return new ResponseEntity<>("Employee created successfully", HttpStatus.CREATED);
    }
    // Get all employees
    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) {
        Optional<Employee> employee = employeeService.getEmployeeById(id);
        return employee.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update an existing employee
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable int id, @RequestBody Employee employee) {
        employee.setId(id);  // Set the ID to ensure the correct employee is updated
        Employee updatedEmployee = employeeService.updateEmployee(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // Delete an employee by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
        Optional<Employee> existingEmployee = employeeService.getEmployeeById(id);
        if (existingEmployee.isPresent()) {
            employeeService.deleteEmployee(id);
            return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Employee not found", HttpStatus.NOT_FOUND);
    }
}
