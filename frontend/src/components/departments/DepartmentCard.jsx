import {
FiGrid,
FiEdit2
} from "react-icons/fi";

const DepartmentCard = ({ department }) => {

return(

<div className="department-card">

<div className="department-top">

<div className="department-icon">

<FiGrid/>

</div>

{
department.open>0 &&

<div className="open-badge">

{department.open} open

</div>

}

</div>

<h2>

{department.name}

</h2>

<p>

Head: {department.head}

</p>

<div className="department-stats">

<div className="mini-card">

<h3>

{department.employees}

</h3>

<span>

Employees

</span>

</div>

<div className="mini-card">

<h3>

{department.budget}

</h3>

<span>

Budget

</span>

</div>

</div>

<div className="department-footer">

<button>

View Team

</button>

<FiEdit2 className="edit-icon"/>

</div>

</div>

)

}

export default DepartmentCard;