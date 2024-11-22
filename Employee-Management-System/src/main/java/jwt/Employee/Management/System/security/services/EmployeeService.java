package jwt.Employee.Management.System.Service;

import jwt.Employee.Management.System.Model.Employee;
import jwt.Employee.Management.System.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    // Fetch all employees
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    // Fetch an employee by ID
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    // Save a new employee
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Update an employee by ID
    public Employee update(Long id, Employee employeeDetails) {
        // First, check if the employee exists
        Optional<Employee> existingEmployee = employeeRepository.findById(id);
        if (existingEmployee.isPresent()) {
            Employee employee = existingEmployee.get();
            // Update employee fields
            employee.setName(employeeDetails.getName());
            employee.setDepartment(employeeDetails.getDepartment());
            employee.setPosition(employeeDetails.getPosition());
            employee.setRoles(employeeDetails.getRoles());  // Update roles if needed
            return employeeRepository.save(employee); // Save the updated employee
        }
        throw new RuntimeException("Employee not found with id " + id);
    }

    // Delete an employee by ID
    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }
}
