import {
useEffect,
useState
} from "react";


import {
getApprovalStats
} from "../../services/approvalService";



export default function ApprovalStats(){


const [stats,setStats]=useState({

pending:0,
approved:0,
rejected:0,
avgTime:"0h"

});



useEffect(()=>{

loadStats();

},[]);



async function loadStats(){

try{

const data =
await getApprovalStats();


setStats(data);


}catch(error){

console.log(error);

}

}




const cards=[

{
title:"Pending Approval",
value:stats.pending
},

{
title:"Approved",
value:stats.approved
},

{
title:"Rejected",
value:stats.rejected
},

{
title:"Avg Approval Time",
value:stats.avgTime
}

];



return(

<div className="approval-stats">

{
cards.map(item=>(

<div
className="approval-card"
key={item.title}
>

<span>
{item.title}
</span>


<h2>
{item.value}
</h2>


</div>

))
}

</div>

);

}