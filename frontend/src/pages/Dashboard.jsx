import {
    useEffect,
    useState
} from "react";


import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import StatCard from "../components/StatCard";

import BookingFlow from "../components/BookingFlow";
import StatusChart from "../components/StatusChart";
import BookingTrend from "../components/BookingTrend";
import Utilization from "../components/Utilization";
import RecentBooking from "../components/RecentBooking";


import {
    getDashboard
} from "../services/dashboardService";


import "../styles/dashboard.css";




export default function Dashboard(){


const [
    sidebarOpen,
    setSidebarOpen
]=useState(false);



const [
    dashboard,
    setDashboard
]=useState(null);



const [
    loading,
    setLoading
]=useState(true);





useEffect(()=>{

loadDashboard();

},[]);






async function loadDashboard(){


try{


const data =
await getDashboard();


setDashboard(data);



}catch(error){

console.log(
"Dashboard error",
error
);


}finally{

setLoading(false);

}


}






const stats=[


{
label:"Total vehicles",
value:
dashboard?.vehicles?.total ?? 0,
icon:"◆",
tone:"blue",
note:"Total fleet"
},



{
label:"Available",
value:
dashboard?.vehicles?.available ?? 0,
icon:"◌",
tone:"cyan",
note:"Available vehicles"
},



{
label:"In use",
value:
dashboard?.vehicles?.inUse ?? 0,
icon:"↗",
tone:"violet",
note:"Currently operating"
},



{
label:"Maintenance",
value:
dashboard?.vehicles?.maintenance ?? 0,
icon:"⚠",
tone:"amber",
note:"Requires attention"
}



];





if(loading){

return <p>Loading dashboard...</p>

}





return(


<div className="fleet-dashboard">


<Sidebar

open={sidebarOpen}

onClose={
()=>setSidebarOpen(false)
}

/>



<main className="dashboard-content">



<TopNavbar

onMenuClick={
()=>setSidebarOpen(true)
}

/>




<section className="dashboard-intro">


<div>

<p className="eyebrow">

Operations center 
<span className="live-dot"/>

Live fleet data

</p>


<h1>
Fleet Overview
</h1>


<p>
Monitor availability, bookings, and vehicle performance in one place.
</p>


</div>



<button className="primary-action">

+ New booking

</button>



</section>






<section className="stats-grid">


{
stats.map(stat=>(

<StatCard

key={stat.label}

{...stat}

/>

))

}


</section>







<section className="dashboard-bento">


<div className="dashboard-left">


<BookingFlow

approval={
dashboard?.approval
}

/>


<StatusChart

vehicles={
dashboard?.vehicles
}

/>


</div>



<BookingTrend

bookings={
dashboard?.recentBookings
}

/>


</section>






<section className="dashboard-bottom">


<Utilization

bookings={
dashboard?.recentBookings
}

/>


<RecentBooking

bookings={
dashboard?.recentBookings
}

/>


</section>





</main>


</div>


)

}