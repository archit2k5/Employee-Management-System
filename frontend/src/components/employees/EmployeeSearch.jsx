import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";
import "./employees.css";

const EmployeeSearch = () => {
  return (
    <div className="employee-search">

      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search employees..."
        />
      </div>

      <div className="search-actions">

        <button className="action-btn">
          <FiFilter />
          Filter
        </button>

        <button className="action-btn">
          <FiDownload />
          Export
        </button>

      </div>

    </div>
  );
};

export default EmployeeSearch;