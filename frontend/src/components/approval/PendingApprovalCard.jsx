export default function PendingApprovalCard({
    data,
    onApprove,
    onReject
}) {


const booking = data.booking;



function formatDate(date){

    if(!date) return "-";


    return new Date(
        date.split("T")[0]
    ).toLocaleDateString(
        "en-GB"
    );

}




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





<span className={`status ${data.decision?.toLowerCase()}`}>

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
formatDate(
booking?.booking_date
)

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







<span
className={
data.level === 1
?
"active"
:
"done"
}
>

Level 1

</span>







<span
className={
data.level === 2
?
"active"
:
data.decision === "Approved"
?
"done"
:
""
}
>

Level 2

</span>








<span
className={
booking?.status === "APPROVED"
?
"done"
:
""
}
>

Approved

</span>







</div>









<div className="approval-actions">





<button

className="approve"

onClick={() =>
onApprove &&
onApprove(data.id)
}

>

Approve

</button>







<button

className="reject"

onClick={() =>
onReject &&
onReject(data.id)
}

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