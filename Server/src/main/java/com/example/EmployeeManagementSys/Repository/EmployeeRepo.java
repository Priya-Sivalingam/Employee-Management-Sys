package com.example.EmployeeManagementSys.Repository;

import com.example.EmployeeManagementSys.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class EmployeeRepo {

    private JdbcTemplate template;

    @Autowired
    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }

    public void save(Employee employee){
        // Note that we are not setting the id if it's auto-generated (SERIAL)
        String sql = "INSERT INTO employees (name, email, username, password, role) VALUES (?, ?, ?, ?, ?)";
        int rows = template.update(sql, employee.getName(), employee.getEmail(), employee.getUsername(), employee.getPassword(), employee.getRole());

        System.out.println(rows + "rows/s affected");
    }

    public List<Employee> findAll(){
        // Assuming you have a query to retrieve all employees
        String sql = "SELECT * FROM employees";

        RowMapper<Employee> mapper = new RowMapper<Employee>() {
            @Override
            public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
                Employee employee = new Employee();
                employee.setId(rs.getInt("id"));
                employee.setName(rs.getString("name"));
                employee.setEmail(rs.getString("email"));
                employee.setUsername(rs.getString("username"));
                employee.setPassword(rs.getString("password"));
                employee.setRole(rs.getString("role"));
                return employee;
            }
        };

        List<Employee> employees = template.query(sql,mapper);
        return employees;
    }

    public void delete(int id) {
        String sql = "DELETE FROM employees WHERE id = ?";
        template.update(sql, id);
    }

    // Update Employee details
    public void update(Employee employee) {
        String sql = "UPDATE employees SET name = ?, email = ?, username = ?, password = ?, role = ? WHERE id = ?";
        template.update(sql, employee.getName(), employee.getEmail(), employee.getUsername(), employee.getPassword(), employee.getRole(), employee.getId());
    }
}
