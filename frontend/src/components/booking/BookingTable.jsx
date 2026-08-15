import { Eye } from "lucide-react";


const statusClass = {
    APPROVED:"approved",
    PENDING:"pending",
    REJECTED:"rejected"
};


export default function BookingTable({bookings}){


return (

<section className="booking-table-card">


<div className="booking-scroll">


<table className="booking-table">


<thead>

<tr>

<th>Booking ID</th>

<th>Requester</th>

<th>Vehicle</th>

<th>Driver</th>

<th>Destination</th>

<th>Date</th>

<th>Status</th>

<th>Action</th>


</tr>


</thead>



<tbody>

{
bookings?.map((booking)=>(

<tr key={booking.id}>

<td>
{booking.booking_code || "-"}
</td>


<td>
{booking.requester?.name || "-"}
</td>


<td>
{
booking.vehicle
?
`${booking.vehicle.brand} ${booking.vehicle.model}`
:
"-"
}
</td>


<td>
{booking.driver?.name || "-"}
</td>


<td>
{booking.destination || "-"}
</td>


<td>

{
booking.booking_date
?
new Date(
booking.booking_date
)
.toLocaleDateString("en-GB")
:
"-"
}

</td>


<td>

<span className="booking-status">

{booking.status}

</span>

</td>


<td>

<button className="view-booking">
<Eye size={15}/>
</button>

</td>


</tr>


))

}

</tbody>



</table>


</div>



</section>


)

}