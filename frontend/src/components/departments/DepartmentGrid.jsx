import DepartmentCard from "./DepartmentCard";

const departments = [

{
name:"Engineering",
head:"Michael Torres",
employees:42,
budget:"5.2M",
open:3
},

{
name:"Design",
head:"Anna Lee",
employees:15,
budget:"1.8M",
open:1
},

{
name:"Marketing",
head:"James Park",
employees:18,
budget:"2.1M",
open:1
},

{
name:"Sales",
head:"Tom Walker",
employees:25,
budget:"3.1M",
open:2
},

{
name:"HR",
head:"Sarah Mitchell",
employees:8,
budget:"0.9M",
open:0
},

{
name:"Finance",
head:"Robert Chen",
employees:10,
budget:"1.2M",
open:1
}

];

const DepartmentGrid = () => {

return(

<div className="department-grid">

{

departments.map((dept,index)=>(

<DepartmentCard
key={index}
department={dept}
/>

))

}

</div>

)

}

export default DepartmentGrid;