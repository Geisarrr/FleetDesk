export default function PendingApprovalCard({
    data,
    onAction
}) {


const booking = data.booking;



return (

<div className="approval-request">


<div className="request-top">


<div>

<h3>
{booking?.requester?.name || "-"}
</h3>


<p>
{booking?.booking_code || "-"}
</p>


</div>



<span className="status">
{data.decision}
</span>


</div>





<div className="request-info">



<div>

Vehicle

<strong>

{
booking?.vehicle
?
`${booking.vehicle.brand} ${booking.vehicle.model}`
:
"-"
}

</strong>

</div>





<div>

Driver

<strong>

{
booking?.driver?.name || "-"
}

</strong>

</div>





<div>

Destination

<strong>

{
booking?.destination || "-"
}

</strong>

</div>





<div>

Date

<strong>

{
booking?.booking_date
?
new Date(
booking.booking_date
).toLocaleDateString(
"en-GB"
)
:
"-"
}

</strong>

</div>



</div>







<div className="purpose">

{
booking?.purpose || "-"
}

</div>








<div className="timeline">



<span className="done">

Created

</span>



<span className="active">

Level {data.level}

</span>



<span>

Level 2

</span>



<span>

Approved

</span>



</div>







<div className="approval-actions">


<button
className="approve"
onClick={()=>onAction(
    "approve",
    data.id
)}
>
Approve
</button>



<button
className="reject"
onClick={()=>onAction(
    "reject",
    data.id
)}
>
Reject
</button>



<button>
Note
</button>


</div>





</div>


)

}