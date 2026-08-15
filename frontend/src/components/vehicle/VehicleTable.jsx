import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";


const statusClass = {
    ACTIVE:"active",
    MAINTENANCE:"maintenance",
    INACTIVE:"inactive"
};



export default function VehicleTable({vehicles,total}){


return (

<>


<div className="vehicle-table-scroll">


<table className="vehicle-table">


<thead>

<tr>

<th>License Plate</th>

<th>Type</th>

<th>Brand & Model</th>

<th>Year</th>

<th>Region / Site</th>

<th>Status</th>

<th>
Action
</th>

</tr>

</thead>



<tbody>



{
vehicles.map((vehicle)=>(



<tr key={vehicle.id}>


<td className="plate">

{vehicle.license_plate}

</td>



<td>

{
vehicle.vehicle_type?.name ?? "-"
}

</td>



<td className="model">

{vehicle.brand}

{" "}

{vehicle.model}

</td>



<td>

{vehicle.year}

</td>



<td>


<div>

{
vehicle.site?.region?.name ?? "-"
}

</div>


<small>

{
vehicle.site?.name ?? "-"
}

</small>


</td>



<td>


<span 
className={
`vehicle-status ${statusClass[vehicle.status]}`
}
>


<i/>

{vehicle.status}


</span>



</td>



<td>


<button 
className="edit-vehicle"
>


<Pencil size={14}/>


</button>


</td>



</tr>



))


}





{
vehicles.length===0 &&


<tr>

<td 
colSpan="7"
className="empty-vehicles"
>

No vehicles found.


</td>


</tr>


}



</tbody>


</table>



</div>





<footer className="vehicle-pagination">


<span>

Showing {vehicles.length} of {total}

</span>



<div>


<button>

<ChevronLeft size={15}/>

</button>


<button>

<ChevronRight size={15}/>

</button>


</div>


</footer>



</>


)

}