package employeemanagementsys.example.employeemanagementsys.DAO;
import employeemanagementsys.example.employeemanagementsys.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Add a new employee
    public int addEmployee(Employee employee) {
        String sql = "INSERT INTO employees (name, role, department) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, employee.getName(), employee.getRole(), employee.getDepartment());
    }

    // Get all employees
    public List<Employee> getAllEmployees() {
        String sql = "SELECT * FROM employees";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Employee employee = new Employee();
            employee.setId(rs.getInt("id"));
            employee.setName(rs.getString("name"));
            employee.setRole(rs.getString("role"));
            employee.setDepartment(rs.getString("department"));
            return employee;
        });
    }

    // Get a single employee by ID
    public Employee getEmployeeById(int id) {
        String sql = "SELECT * FROM employees WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Employee employee = new Employee();
            employee.setId(rs.getInt("id"));
            employee.setName(rs.getString("name"));
            employee.setRole(rs.getString("role"));
            employee.setDepartment(rs.getString("department"));
            return employee;
        });
    }

    // Update an employee (admin only)
    public int updateEmployee(Employee employee) {
        String sql = "UPDATE employees SET name = ?, role = ?, department = ? WHERE id = ?";
        return jdbcTemplate.update(sql, employee.getName(), employee.getRole(), employee.getDepartment(), employee.getId());
    }

    // Delete an employee (admin only)
    public int deleteEmployee(int id) {
        String sql = "DELETE FROM employees WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }
}
