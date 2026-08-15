export default function PendingApprovalCard({data}){


return(

<div className="approval-request">


<div className="request-top">


<div>

<h3>
{data.name}
</h3>

<p>
{data.department}
</p>

</div>


<span className="status">
{data.status}
</span>


</div>



<div className="request-info">


<div>
Vehicle
<strong>
{data.vehicle}
</strong>
</div>


<div>
Driver
<strong>
{data.driver}
</strong>
</div>


<div>
Destination
<strong>
{data.destination}
</strong>
</div>


<div>
Date
<strong>
{data.date}
</strong>
</div>


</div>



<div className="purpose">

{data.purpose}

</div>



<div className="timeline">


<span className="done">
Created
</span>


<span className="active">
Level 1
</span>


<span>
Level 2
</span>


<span>
Approved
</span>


</div>



<div className="approval-actions">


<button className="approve">
Approve
</button>


<button className="reject">
Reject
</button>


<button>
Note
</button>


</div>



</div>

)

}