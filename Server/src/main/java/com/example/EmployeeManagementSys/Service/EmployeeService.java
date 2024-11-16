package com.example.EmployeeManagementSys.Service;
import com.example.EmployeeManagementSys.Repository.EmployeeRepo;
import com.example.EmployeeManagementSys.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepo employeeRepo;

    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    // Create a new Employee
    public void createEmployee(Employee employee) {
        employeeRepo.save(employee);
    }

    // Get all Employees
    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    // Get Employee by ID
    public Optional<Employee> getEmployeeById(int id) {
        List<Employee> employees = employeeRepo.findAll();
        return employees.stream().filter(emp -> emp.getId() == id).findFirst();
    }

    // Update Employee
    public Employee updateEmployee(Employee employee) {
        Optional<Employee> existingEmployee = getEmployeeById(employee.getId());
        if (existingEmployee.isPresent()) {
            employeeRepo.save(employee); // Update operation
        }
        return employee;
    }

    // Delete Employee by ID
    public void deleteEmployee(int id) {
        Optional<Employee> existingEmployee = getEmployeeById(id);
        if (existingEmployee.isPresent()) {
            employeeRepo.delete(id); // Delete operation
        }
    }

}
