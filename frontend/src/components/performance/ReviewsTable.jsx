import { FiStar } from "react-icons/fi";

const reviews=[

{
initials:"AC",
name:"Alex Chen",
department:"Engineering",
reviewer:"S. Mitchell",
rating:"4.3",
period:"Q2 2024",
status:"completed",
color:"#3B82F6"
},

{
initials:"MS",
name:"Maria Santos",
department:"Design",
reviewer:"S. Mitchell",
rating:"4.5",
period:"Q2 2024",
status:"pending",
color:"#A855F7"
},

{
initials:"JP",
name:"James Park",
department:"Marketing",
reviewer:"S. Mitchell",
rating:"3.9",
period:"Q2 2024",
status:"completed",
color:"#10B981"
},

{
initials:"PS",
name:"Priya Sharma",
department:"Analytics",
reviewer:"S. Mitchell",
rating:"4.1",
period:"Q2 2024",
status:"completed",
color:"#F97316"
},

{
initials:"TW",
name:"Tom Walker",
department:"Sales",
reviewer:"S. Mitchell",
rating:"4.4",
period:"Q2 2024",
status:"pending",
color:"#EF4444"
}

];

const ReviewsTable=()=>{

return(

<div className="review-card">

<h3>Recent Reviews</h3>

<table className="review-table">

<thead>

<tr>

<th>Employee</th>

<th>Department</th>

<th>Reviewer</th>

<th>Rating</th>

<th>Period</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{
reviews.map((item,index)=>(

<tr key={index}>

<td>

<div className="employee-cell">

<div
className="avatar"
style={{background:item.color}}
>

{item.initials}

</div>

{item.name}

</div>

</td>

<td>{item.department}</td>

<td>{item.reviewer}</td>

<td>

<FiStar
color="#FACC15"
/>

{" "}

{item.rating}

</td>

<td>{item.period}</td>

<td>

<span className={`status-pill ${item.status}`}>

{item.status}

</span>

</td>

</tr>

))
}

</tbody>

</table>

</div>

)

}

export default ReviewsTable;