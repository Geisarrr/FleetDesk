export default function StatusChart({
vehicles
}){


const total =
(vehicles?.available ?? 0)
+
(vehicles?.inUse ?? 0)
+
(vehicles?.maintenance ?? 0);



const available =
total
?
Math.round(
vehicles.available / total *100
)
:
0;



const inUse =
total
?
Math.round(
vehicles.inUse / total *100
)
:
0;



const maintenance =
total
?
Math.round(
vehicles.maintenance / total *100
)
:
0;



return(

<article className="glass-card status-chart">


<div className="card-heading">

<div>

<p>
Fleet status
</p>

<h2>
Status ratio
</h2>

</div>

</div>




<div className="donut">


<div className="donut-hole">

<strong>
{total}
</strong>

<span>
Vehicles
</span>


</div>


</div>





<div className="status-text">


<p>
In use {inUse}%
</p>


<p>
Available {available}%
</p>


<p>
Maintenance {maintenance}%
</p>


</div>


</article>


)


}