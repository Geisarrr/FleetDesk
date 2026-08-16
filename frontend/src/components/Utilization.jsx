export default function Utilization({
    bookings=[]
}){


const vehicles={};


bookings.forEach(item=>{


const name =
item.vehicle?.brand +
" " +
item.vehicle?.model;



vehicles[name]=
(vehicles[name] || 0)+1;



});



return(


<article className="glass-card">


<div className="card-heading">

<div>

<p>
Top performers
</p>


<h2>
Model utilization
</h2>


</div>

</div>



{

Object.keys(vehicles).map(name=>(


<div key={name}>


<strong>
{name}
</strong>


<p>
Used {vehicles[name]} times
</p>


</div>



))


}



</article>



)


}