const stats=[

{
title:"Pending Approval",
value:"12"
},

{
title:"Approved Today",
value:"24"
},

{
title:"Rejected",
value:"3"
},

{
title:"Avg Approval Time",
value:"2.5h"
}


]


export default function ApprovalStats(){


return(

<div className="approval-stats">

{
stats.map(item=>(

<div className="approval-card" key={item.title}>


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


)

}