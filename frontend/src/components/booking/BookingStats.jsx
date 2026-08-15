import {
  ClipboardList,
  ShieldAlert,
  CheckCircle,
  XCircle
} from "lucide-react";


export default function BookingStats({
  bookings = []
}) {



const normalizeStatus = (status)=>{

return status
?.toString()
?.toUpperCase();

};





const total = bookings.length;




const approved = bookings.filter(
(item)=>
normalizeStatus(item.status) === "APPROVED"
).length;




const pending = bookings.filter(
(item)=>
normalizeStatus(item.status)?.includes("PENDING")
).length;




const rejected = bookings.filter(
(item)=>
normalizeStatus(item.status) === "REJECTED"
).length;





const stats = [

{
label:"Total Requests",
value:total,
footer:"All booking requests",
icon:ClipboardList,
tone:"blue"
},


{
label:"Pending Approval",
value:pending,
footer:"Waiting approval",
icon:ShieldAlert,
tone:"yellow"
},


{
label:"Approved",
value:approved,
footer:"Approved bookings",
icon:CheckCircle,
tone:"cyan"
},


{
label:"Rejected",
value:rejected,
footer:"Rejected bookings",
icon:XCircle,
tone:"red"
}

];






return (

<section
className="booking-monitoring-stats"
aria-label="Booking statistics"
>


{
stats.map(
({
label,
value,
footer,
icon:Icon,
tone
})=>(


<article
key={label}
className={
`booking-monitoring-stat stat-tone--${tone}`
}
>


<div className="monitoring-stat-top">


<span>

<Icon size={17}/>

</span>



<i>

<b></b>
<b></b>
<b></b>
<b></b>
<b></b>
<b></b>

</i>


</div>





<p>
{label}
</p>




<strong>
{value}
</strong>





<small>
{footer}
</small>




</article>


)

)

}


</section>

);


}