import {
    useEffect,
    useState
} from "react";


import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";


import ApprovalStats from "../components/approval/ApprovalStats";
import ApprovalFilters from "../components/approval/ApprovalFilters";
import PendingApprovalCard from "../components/approval/PendingApprovalCard";
import ApprovalActivity from "../components/approval/ApprovalActivity";


import {
    getPendingApprovals,
    approveBooking,
    rejectBooking
} from "../services/approvalService";


import "../styles/approval-dashboard.css";





export default function ApprovalDashboard(){



const [sidebarOpen,setSidebarOpen]=useState(false);


const [requests,setRequests]=useState([]);


const [loading,setLoading]=useState(true);


const [error,setError]=useState(null);





useEffect(()=>{

loadApprovals();

},[]);





async function loadApprovals(){

try{


setLoading(true);


const data =
await getPendingApprovals();



console.log(
"APPROVAL DATA",
data
);



setRequests(data);



}catch(error){


console.log(error);



setError(
"Failed load approvals"
);



}finally{


setLoading(false);


}


}







async function handleApprovalAction(
type,
id
){


try{


if(type === "approve"){


await approveBooking(id);


}



if(type === "reject"){


await rejectBooking(
id,
"Rejected by approver"
);


}




// refresh data setelah action

await loadApprovals();



}catch(error){


console.log(
error
);



alert(
"Approval action failed"
);


}



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









<ApprovalStats

requests={requests}

/>









<section className="approval-layout">





<div className="approval-main">





<ApprovalFilters />







{
loading &&

<p>
Loading approvals...
</p>

}








{
error &&

<p>
{error}
</p>

}








{

!loading &&
!error &&
requests.length === 0 &&

<p>

No pending approval

</p>

}









{

requests.map(item=>(


<PendingApprovalCard


key={
item.id
}


data={item}



onAction={
handleApprovalAction
}


/>


))


}







</div>








<ApprovalActivity />







</section>







</main>





</div>


);


}