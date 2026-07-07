import EmployeeRow from "./EmployeeRow";
import "./employees.css";

const employees = [
  {
    id: "EMP-001",
    initials: "AC",
    color: "#3B82F6",
    name: "Alex Chen",
    email: "alex.chen@nexus.io",
    department: "Engineering",
    role: "Senior Engineer",
    status: "Active",
    salary: "$125k",
  },
  {
    id: "EMP-002",
    initials: "MS",
    color: "#A855F7",
    name: "Maria Santos",
    email: "m.santos@nexus.io",
    department: "Design",
    role: "Product Designer",
    status: "Active",
    salary: "$98k",
  },
  {
    id: "EMP-003",
    initials: "JP",
    color: "#10B981",
    name: "James Park",
    email: "j.park@nexus.io",
    department: "Marketing",
    role: "Marketing Lead",
    status: "Active",
    salary: "$89k",
  },
  {
    id: "EMP-004",
    initials: "PS",
    color: "#F97316",
    name: "Priya Sharma",
    email: "p.sharma@nexus.io",
    department: "Analytics",
    role: "Data Analyst",
    status: "On Leave",
    salary: "$105k",
  },
  {
    id: "EMP-005",
    initials: "TW",
    color: "#EF4444",
    name: "Tom Walker",
    email: "t.walker@nexus.io",
    department: "Sales",
    role: "Sales Manager",
    status: "Active",
    salary: "$115k",
  },
  {
    id: "EMP-006",
    initials: "LK",
    color: "#EC4899",
    name: "Lisa Kim",
    email: "l.kim@nexus.io",
    department: "HR",
    role: "HR Specialist",
    status: "Active",
    salary: "$82k",
  },
];

const EmployeeTable = () => {
  return (
    <div className="employee-table">

      <div className="table-header">

        <div>Employee</div>
        <div>ID</div>
        <div>Department</div>
        <div>Role</div>
        <div>Status</div>
        <div>Salary</div>
        <div>Actions</div>

      </div>

      {employees.map((employee) => (
        <EmployeeRow
          key={employee.id}
          employee={employee}
        />
      ))}

    </div>
  );
};

export default EmployeeTable;