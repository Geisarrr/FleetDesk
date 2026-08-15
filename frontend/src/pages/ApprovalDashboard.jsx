import { useState } from "react";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

import ApprovalStats from "../components/approval/ApprovalStats";
import ApprovalFilters from "../components/approval/ApprovalFilters";
import PendingApprovalCard from "../components/approval/PendingApprovalCard";
import ApprovalActivity from "../components/approval/ApprovalActivity";

import "../styles/approval-dashboard.css";


const requests = [

{
id:"BOOK-000001",
name:"John Doe",
department:"Operations",
vehicle:"Toyota Innova",
driver:"Budi Santoso",
destination:"Jakarta",
date:"30 Aug 2026",
purpose:"Operational meeting",
status:"Pending Level 2"
},


{
id:"BOOK-000002",
name:"Rina Wati",
department:"Finance",
vehicle:"Mitsubishi Pajero",
driver:"Ahmad Ridwan",
destination:"Bekasi",
date:"31 Aug 2026",
purpose:"Audit site visit",
status:"Pending Level 1"
},


{
id:"BOOK-000003",
name:"Deni Kurniawan",
department:"HR",
vehicle:"Toyota Fortuner",
driver:"Slamet Riyadi",
destination:"Tangerang",
date:"1 Sep 2026",
purpose:"Recruitment event",
status:"Pending Level 1"
}


]


export default function ApprovalDashboard(){

const [sidebarOpen,setSidebarOpen]=useState(false);


return(

<div className="fleet-dashboard">


<Sidebar
open={sidebarOpen}
onClose={()=>setSidebarOpen(false)}
/>


<main className="dashboard-content">


<TopNavbar
onMenuClick={()=>setSidebarOpen(true)}
searchPlaceholder="Search approvals..."
/>


<section className="approval-header">


<div>

<p className="eyebrow">
Approval Center
</p>


<h1>
Approval Dashboard
</h1>


<p>
Review and manage pending fleet booking requests.
</p>


</div>


<button className="primary-action">
Filter
</button>


</section>



<ApprovalStats />



<section className="approval-layout">


<div className="approval-main">


<ApprovalFilters />


{
requests.map(item=>(

<PendingApprovalCard
key={item.id}
data={item}
/>

))
}


</div>



<ApprovalActivity />


</section>


</main>


</div>


)

}