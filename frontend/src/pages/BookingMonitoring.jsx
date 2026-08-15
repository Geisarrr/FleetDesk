import { useEffect, useMemo, useState } from "react";
import { Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import BookingStats from "../components/booking/BookingStats";
import BookingFilters from "../components/booking/BookingFilters";
import BookingTable from "../components/booking/BookingTable";
import BookingDetailDrawer from "../components/booking/BookingDetailDrawer";
import VehicleCalendar from "../components/booking/calendar/VehicleCalendar";

import {
  getBookings
} from "../services/bookingService";


import "../styles/dashboard.css";
import "../styles/booking-monitoring.css";



function getCanCreateBooking(){

try{

const user = JSON.parse(
localStorage.getItem("user") || "{}"
);


const role = user.role?.name ?? user.role;


return role !== "Approver";


}catch{

return true;

}

}




export default function BookingMonitoring(){


const navigate = useNavigate();


const [sidebarOpen,setSidebarOpen] = useState(false);


const [bookings,setBookings] = useState([]);


const [tab,setTab] = useState("All");


const [selectedBooking,setSelectedBooking] = useState(null);


const [calendarOpen,setCalendarOpen] = useState(false);





useEffect(()=>{

loadBookings();

},[]);





async function loadBookings(){

try{

const data = await getBookings();


console.log(
"BOOKING API",
data
);



const formatted = data.map(item=>({

...item,


status:
item.status?.toUpperCase(),


booking_code:
item.booking_code || item.id,


vehicle:
item.vehicle || null,


driver:
item.driver || null


}));



setBookings(formatted);



}catch(error){

console.log(
"LOAD BOOKING ERROR",
error
);


}

}





const visibleBookings = useMemo(()=>{


if(tab==="All")
return bookings;



if(tab==="Pending")

return bookings.filter(
item=>
item.status?.includes("PENDING")
);



if(tab==="Approved")

return bookings.filter(
item=>
item.status==="APPROVED"
);



return bookings.filter(
item=>
item.status==="DRAFT"
);



},[bookings,tab]);





const canCreateBooking = getCanCreateBooking();




return (

<div className="fleet-dashboard booking-monitoring-page">


<Sidebar
open={sidebarOpen}
onClose={()=>setSidebarOpen(false)}
/>



<main className="dashboard-content booking-monitoring-content">


<TopNavbar
onMenuClick={()=>setSidebarOpen(true)}
/>




<section className="monitoring-header">


<div>


<p className="monitoring-kicker">
Fleet request command
</p>


<h1>
Booking Operations
</h1>


<p>
Monitor and manage all active fleet requests across regions.
</p>


</div>




<div className="monitoring-actions">


<button>

<Filter size={15}/>

Filters

</button>



{
canCreateBooking &&

<button
className="new-booking-button"
onClick={()=>navigate("/booking/create")}
>


<Plus size={16}/>

New Booking


</button>

}



</div>


</section>






<BookingStats
bookings={bookings}
/>







<section className="calendar-monitoring-section">


<div>


<p>
Fleet scheduling
</p>


<h2>
Vehicle Availability
</h2>


</div>



<button
onClick={()=>setCalendarOpen(!calendarOpen)}
>


{
calendarOpen
?
"Hide Calendar"
:
"View Calendar"
}


</button>



</section>




{
calendarOpen &&

<VehicleCalendar
canCreateBooking={canCreateBooking}
onNewBooking={()=>
navigate("/booking/create")
}
/>

}





<section className="booking-log-panel">



<header className="booking-log-header">


<div>


<p>
Operational registry
</p>


<h2>
Active Log
</h2>


</div>



<BookingFilters
activeTab={tab}
onTabChange={setTab}
/>



</header>





<BookingTable

bookings={visibleBookings}

onSelectBooking={setSelectedBooking}

/>




</section>




</main>




<BookingDetailDrawer

booking={selectedBooking}

onClose={()=>
setSelectedBooking(null)
}

/>



</div>


);


}