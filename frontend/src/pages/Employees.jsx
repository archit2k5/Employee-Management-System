import EmployeeSearch from "../components/employees/EmployeeSearch";
import EmployeeTable from "../components/employees/EmployeeTable";
import "../components/employees/employees.css";

const Employees = () => {
  return (
    <>
      <div className="page-header employee-header">

        <div>
          <h1>Employee Management</h1>
          <p>View and manage all employees</p>
        </div>

        <button className="add-btn">
          + Add Employee
        </button>

      </div>

      <EmployeeSearch />

      <EmployeeTable />

    </>
  );
};

export default Employees;