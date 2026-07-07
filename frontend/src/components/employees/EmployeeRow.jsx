import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

const EmployeeRow = ({ employee }) => {
  return (
    <div className="table-row">

      <div className="employee-info">

        <div
          className="avatar"
          style={{ background: employee.color }}
        >
          {employee.initials}
        </div>

        <div>

          <h4>{employee.name}</h4>

          <p>{employee.email}</p>

        </div>

      </div>

      <div>{employee.id}</div>

      <div>{employee.department}</div>

      <div>{employee.role}</div>

      <div>
        <span
          className={
            employee.status === "Active"
              ? "status active"
              : "status leave"
          }
        >
          ● {employee.status}
        </span>
      </div>

      <div>{employee.salary}</div>

      <div className="actions">

        <FiEye />

        <FiEdit2 />

        <FiTrash2 />

      </div>

    </div>
  );
};

export default EmployeeRow;