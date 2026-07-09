import DepartmentGrid from "../components/departments/DepartmentGrid";
import "../components/departments/department.css";

const Departments = () => {
  return (
    <>
      <div className="page-header employee-header">

        <div>
          <h1>Departments</h1>
          <p>Manage teams and organizational structure</p>
        </div>

        <button className="add-btn">
          + New Department
        </button>

      </div>

      <DepartmentGrid />

    </>
  );
};

export default Departments;