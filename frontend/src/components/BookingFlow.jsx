export default function BookingFlow({
    approval
}){


const flow=[

{
label:"Pending",
value:approval?.pending ?? 0
},


{
label:"Approved",
value:approval?.approved ?? 0
},


{
label:"Rejected",
value:approval?.rejected ?? 0
}


];



return(

<article className="glass-card booking-flow">


<div className="card-heading">

<div>

<p>
Booking flow
</p>

<h2>
Approval status
</h2>

</div>


<button>
View all →
</button>


</div>



<div className="flow-list">


{
flow.map(item=>(


<div 
className="flow-item"
key={item.label}
>


<p>
{item.label}
</p>


<strong>
{item.value}
</strong>


</div>


))

}



</div>


</article>


)


}