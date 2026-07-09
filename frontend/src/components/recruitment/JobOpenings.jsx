import { FiBriefcase } from "react-icons/fi";

const jobs = [

{
title:"Senior Frontend Engineer",
department:"Engineering",
date:"Posted Jun 15",
candidates:12,
status:"Interviewing"
},

{
title:"UX Researcher",
department:"Design",
date:"Posted Jun 20",
candidates:8,
status:"Screening"
},

{
title:"Growth Marketing Manager",
department:"Marketing",
date:"Posted Jun 10",
candidates:15,
status:"Offer"
}

];

const JobOpenings = () => {

return(

<div className="job-card">

<h3>Active Job Openings</h3>

{
jobs.map((job,index)=>(

<div className="job-row" key={index}>

<div className="job-left">

<div className="job-icon">

<FiBriefcase/>

</div>

<div>

<h4>{job.title}</h4>

<p>
{job.department} • {job.date}
</p>

</div>

</div>

<div className="job-right">

<div className="candidate-count">

<strong>{job.candidates}</strong>

<span>candidates</span>

</div>

<span className={`job-status ${job.status.toLowerCase()}`}>
{job.status}
</span>

<button className="view-btn">

View

</button>

</div>

</div>

))
}

</div>

)

}

export default JobOpenings;