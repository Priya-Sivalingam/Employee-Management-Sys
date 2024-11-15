package employeemanagementsys.example.employeemanagementsys.Service;
import employeemanagementsys.example.employeemanagementsys.DAO.EmployeeDao;
import employeemanagementsys.example.employeemanagementsys.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    public int addEmployee(Employee employee) {
        return employeeDao.addEmployee(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeDao.getAllEmployees();
    }

    public Employee getEmployeeById(int id) {
        return employeeDao.getEmployeeById(id);
    }

    public int updateEmployee(Employee employee) {
        return employeeDao.updateEmployee(employee);
    }

    public int deleteEmployee(int id) {
        return employeeDao.deleteEmployee(id);
    }
}
