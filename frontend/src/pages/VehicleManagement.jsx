import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import VehicleStats from "../components/vehicle/VehicleStats";
import VehicleFilters from "../components/vehicle/VehicleFilters";
import VehicleTable from "../components/vehicle/VehicleTable";

import "../styles/dashboard.css";
import "../styles/vehicle.css";

import { getVehicles } from "../services/vehicleService";



export default function VehicleManagement(){


const [sidebarOpen,setSidebarOpen]=useState(false);


const [vehicles,setVehicles]=useState([]);


const [loading,setLoading]=useState(true);


const [error,setError]=useState("");



const [type,setType]=useState("All Types");


const [status,setStatus]=useState("All Statuses");





useEffect(()=>{


loadVehicles();


},[]);




async function loadVehicles(){


try{


setLoading(true);


const response = await getVehicles();



console.log(
"VEHICLE API:",
response
);



setVehicles(
response.data ?? response
);



}catch(err){


console.log(err);


setError(
"Gagal mengambil data kendaraan"
);


}

finally{


setLoading(false);


}


}






const filteredVehicles =
vehicles.filter((vehicle)=>


(type==="All Types" ||
vehicle.vehicle_type?.name === type)


&&


(status==="All Statuses" ||
vehicle.status === status)



);




return (

<div className="fleet-dashboard vehicle-page">


<Sidebar 
open={sidebarOpen}
onClose={()=>setSidebarOpen(false)}
/>



<main className="dashboard-content vehicle-content">


<TopNavbar 
onMenuClick={()=>setSidebarOpen(true)}
/>



<section className="vehicle-header">


<div>


<p className="vehicle-kicker">
Fleet registry
</p>


<h1>
Vehicle Management
</h1>


<p>
Manage fleet registry, status, and telemetry endpoints.
</p>


</div>



<button 
className="add-vehicle"
>


<Plus size={16}/>

Add Vehicle


</button>


</section>





<VehicleStats />




<section className="vehicle-table-card">



<VehicleFilters

type={type}

status={status}

onTypeChange={setType}

onStatusChange={setStatus}

/>




{
loading ?

<p>
Loading vehicles...
</p>


:

error ?

<p>
{error}
</p>


:


<VehicleTable

vehicles={filteredVehicles}

total={vehicles.length}

/>


}




</section>



</main>


</div>


)

}