export default function RecentBooking({
    bookings = []
}) {


const recentBookings = bookings.slice(0,5);



return (

<article className="glass-card recent-booking">


<div className="card-heading">


<div>

<p>
Latest requests
</p>


<h2>
Recent bookings
</h2>


</div>



<button type="button">
View bookings →
</button>


</div>





<div className="table-scroll">


<table>


<thead>

<tr>

<th>
Booking ID
</th>


<th>
Vehicle
</th>


<th>
Requestor
</th>


<th>
Date range
</th>


<th>
Status
</th>


</tr>


</thead>





<tbody>


{

recentBookings.length === 0 ? (

<tr>

<td colSpan="5">

No booking data

</td>

</tr>


)

:

recentBookings.map((booking)=>(


<tr key={booking.id}>


<td>

<strong>

{booking.booking_code}

</strong>

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


<span className="requestor-initial">


{

booking.requester?.name

?

booking.requester.name

.split(" ")

.map(word=>word[0])

.join("")

:

"-"

}


</span>



{

booking.requester?.name || "-"

}


</td>






<td>


{

booking.booking_date

?

new Date(
booking.booking_date
)
.toLocaleDateString(
"en-GB",
{
day:"2-digit",
month:"2-digit",
year:"numeric"
}
)

:

"-"

}



</td>






<td>


<span 


className={

`status-pill ${
booking.status
?
booking.status.toLowerCase()
:
""
}`

}


>


{

booking.status || "-"

}


</span>


</td>




</tr>


))


}


</tbody>


</table>


</div>


</article>

);


}