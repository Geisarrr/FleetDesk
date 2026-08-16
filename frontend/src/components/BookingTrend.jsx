export default function BookingTrend({
    bookings=[]
}) {


const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
];


const values = [
    0,0,0,0,0,0,0
];



bookings.forEach(item=>{

const date =
new Date(item.booking_date);


let day =
date.getDay();


day =
day === 0
?
6
:
day - 1;


values[day]++;


});



const max =
Math.max(...values,1);



return (

<article className="glass-card booking-trend">


<div className="card-heading">

<div>

<p>
Weekly activity
</p>


<h2>
Booking trend
</h2>


</div>


</div>




<div className="chart-area">


{
values.map((value,index)=>(


<div
className="bar-item"
key={days[index]}
>


<div
className="bar"
style={{
height:
`${(value/max)*120 + 20}px`
}}
>


</div>


<span>
{days[index]}
</span>


</div>


))


}



</div>


</article>


)

}