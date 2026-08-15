import { Download, Filter, Pencil, Trash2 } from "lucide-react";


const isExpired = (expiry) => {

    if(!expiry) return false;

    return new Date(expiry) < new Date();

};



const getInitial = (name)=>{

    if(!name) return "-";

    return name
    .split(" ")
    .map(word=>word[0])
    .join("")
    .substring(0,2)
    .toUpperCase();

};



export default function DriverTable({drivers,total}){


return (


<section className="driver-table-card">


<header className="driver-table-header">


<div>

<p>
Driver directory
</p>

<h2>
Fleet Operators
</h2>

</div>



<div className="driver-tools">


<button type="button">

<Filter size={15}/>

</button>


<button type="button">

<Download size={15}/>

</button>


</div>


</header>





<div className="driver-table-scroll">


<table className="driver-table">


<thead>


<tr>

<th>
Employee ID
</th>


<th>
Driver Name
</th>


<th>
Phone
</th>


<th>
License Number
</th>


<th>
License Expiry
</th>


<th>
Site
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>


</thead>



<tbody>


{
drivers.map((driver)=>(


<tr key={driver.id}>


<td className="driver-id">

{driver.employee_id}

</td>




<td>


<div className="driver-name">


<span>

{
getInitial(driver.name)
}

</span>


<strong>

{driver.name}

</strong>


</div>


</td>




<td>

{driver.phone}

</td>




<td>

{driver.license_number}

</td>





<td 
className={
isExpired(driver.license_expiry)
?
"expired-license"
:
""
}
>


{
new Date(driver.license_expiry)
.toLocaleDateString("id-ID")
}



</td>





<td>


<div>

{
driver.site?.region?.name ?? "-"
}


</div>


<small>

{
driver.site?.name ?? "-"
}


</small>


</td>





<td>


<span 
className={
`driver-status ${driver.status.toLowerCase()}`
}
>


{driver.status}


</span>



</td>






<td>


<div className="driver-actions">


<button
type="button"
>

<Pencil size={14}/>

</button>



<button
type="button"
className="delete-driver"
>


<Trash2 size={14}/>


</button>


</div>


</td>




</tr>



))



}




{
drivers.length===0 &&

<tr>

<td 
colSpan="8"
className="empty-drivers"
>

No drivers found.

</td>

</tr>

}



</tbody>


</table>


</div>





<footer className="driver-pagination">


<span>

Showing {drivers.length} of {total ?? drivers.length} drivers

</span>



<nav>


<button>
Prev
</button>


<button className="current">
1
</button>


<button>
2
</button>


<button>
3
</button>


<button>
Next
</button>


</nav>



</footer>




</section>


)

}