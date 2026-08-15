import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import {
  getVehicles
} from "../services/vehicleService";

import {
  getDrivers
} from "../services/driverService";

import {
  createBooking
} from "../services/bookingService";


import "../styles/dashboard.css";
import "../styles/booking.css";


export default function CreateBooking(){

const navigate = useNavigate();


const [sidebarOpen,setSidebarOpen] = useState(false);


const [vehicles,setVehicles] = useState([]);
const [drivers,setDrivers] = useState([]);



const [form,setForm] = useState({

region_id:1,
site_id:1,
vehicle_id:"",
driver_id:"",
booking_date:"",
start_time:"",
end_time:"",
destination:"",
purpose:"",
notes:""

});




useEffect(()=>{

loadData();

},[]);



async function loadData(){

const vehicleData = await getVehicles();
const driverData = await getDrivers();


setVehicles(
Array.isArray(vehicleData)
? vehicleData
: []
);


setDrivers(
Array.isArray(driverData)
? driverData
: []
);

}




function handleChange(e){

setForm({

...form,

[e.target.name]:e.target.value

});

}




async function handleSubmit(e){

e.preventDefault();


try{


await createBooking(form);


alert("Booking created");


navigate("/booking");


}catch(error){

console.log(error);

alert("Failed create booking");

}


}




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




<section className="dashboard-intro">


<div>

<span className="eyebrow">
BOOKING CENTER
</span>


<h1>
Create Booking
</h1>


<p>
Create new fleet request.
</p>

</div>


</section>





<form
className="glass-card booking-form"
onSubmit={handleSubmit}
>



<label>
Vehicle

<select
name="vehicle_id"
onChange={handleChange}
>


<option>
Select Vehicle
</option>


{
vehicles.map(vehicle=>(

<option
key={vehicle.id}
value={vehicle.id}
>

{vehicle.brand} {vehicle.model}

</option>

))

}


</select>

</label>





<label>
Driver

<select
name="driver_id"
onChange={handleChange}
>


<option>
Select Driver
</option>


{
drivers.map(driver=>(

<option
key={driver.id}
value={driver.id}
>

{driver.name}

</option>

))

}


</select>

</label>





<label>
Booking Date

<input
type="date"
name="booking_date"
onChange={handleChange}
/>

</label>




<label>
Start Time

<input
type="time"
name="start_time"
onChange={handleChange}
/>

</label>




<label>
End Time

<input
type="time"
name="end_time"
onChange={handleChange}
/>

</label>




<label>
Destination

<input
name="destination"
placeholder="Destination"
onChange={handleChange}
/>

</label>





<label>
Purpose

<input
name="purpose"
placeholder="Purpose"
onChange={handleChange}
/>

</label>





<label>
Notes

<textarea
name="notes"
onChange={handleChange}
/>

</label>




<button
className="primary-action"
type="submit"
>

Create Booking

</button>



</form>



</main>

</div>

)


}