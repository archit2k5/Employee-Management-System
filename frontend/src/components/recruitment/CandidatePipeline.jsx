const candidates=[

{
name:"Emily Rodriguez",
role:"Senior Frontend Engineer",
initials:"ER",
status:"Interviewing"
},

{
name:"David Kim",
role:"UX Researcher",
initials:"DK",
status:"Screening"
},

{
name:"Priya Nair",
role:"Growth Marketing",
initials:"PN",
status:"Offer"
}

];

const CandidatePipeline=()=>{

return(

<div className="pipeline-card">

<h3>Candidate Pipeline</h3>

<div className="pipeline-stats">

<div className="pipeline-box applied">

<h2>18</h2>

<p>Applied</p>

</div>

<div className="pipeline-box screening">

<h2>12</h2>

<p>Screening</p>

</div>

<div className="pipeline-box interview">

<h2>8</h2>

<p>Interviewing</p>

</div>

<div className="pipeline-box offer">

<h2>3</h2>

<p>Offer</p>

</div>

</div>

{
candidates.map((item,index)=>(

<div className="candidate-row" key={index}>

<div className="candidate-left">

<div className="candidate-avatar">

{item.initials}

</div>

<div>

<h4>{item.name}</h4>

<p>{item.role}</p>

</div>

</div>

<span className={`job-status ${item.status.toLowerCase()}`}>

{item.status}

</span>

</div>

))
}

</div>

)

}

export default CandidatePipeline;