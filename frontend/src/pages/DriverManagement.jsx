import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import DriverStats from "../components/driver/DriverStats";
import DriverTable from "../components/driver/DriverTable";

import "../styles/dashboard.css";
import "../styles/driver.css";

import { getDrivers } from "../services/driverService";


export default function DriverManagement(){


const [sidebarOpen,setSidebarOpen]=useState(false);


const [drivers,setDrivers]=useState([]);


const [loading,setLoading]=useState(true);


const [error,setError]=useState("");



useEffect(()=>{


async function fetchDrivers(){


try{


const response = await getDrivers();


setDrivers(response.data);



}catch(err){


console.error(err);

setError("Failed loading drivers");


}

finally{


setLoading(false);


}


}



fetchDrivers();


},[]);



return (


<div className="fleet-dashboard">


<Sidebar 
open={sidebarOpen}
onClose={()=>setSidebarOpen(false)}
/>



<main className="dashboard-content">


<TopNavbar
onMenuClick={()=>setSidebarOpen(true)}
/>



<section className="vehicle-header">


<div>


<p className="vehicle-kicker">
Driver Registry
</p>


<h1>
Driver Management
</h1>


<p>
Manage driver profiles, licenses, and assignments.
</p>


</div>


</section>




<DriverStats drivers={drivers}/>



<section className="driver-content-card">


{
loading && 
<p>Loading drivers...</p>
}



{
error &&
<p>{error}</p>
}



{
!loading &&
<DriverTable 
drivers={drivers}
/>
}



</section>


</main>


</div>


)


}