import {useState} from "react";
import {login} from "../api/auth";
import {useNavigate} from "react-router-dom";

import "./login.css";


export default function Login(){


const navigate = useNavigate();


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [error,setError]=useState("");



const handleSubmit = async(e)=>{

e.preventDefault();


try {

const response = await login(
    email,
    password
);


const userData = response.data;


localStorage.setItem(
    "token",
    userData.token
);


localStorage.setItem(
    "user",
    JSON.stringify(userData.user)
);


navigate("/dashboard");


}catch{

setError(
"Email atau password salah"
);

}


};



return (

<div className="login-page">


<div className="login-container">


<div className="brand-section">


<h1>
<span>◈</span>
FleetDesk
</h1>


<p>
Smarter Vehicle Operations, One Desk.
Secure access to your enterprise fleet
telemetry and control systems.
</p>



<div className="map-box">

<img 
src="/fleet-map.png"
/>

</div>



<div className="status">

<span></span>

NODE_SYNC_ACTIVE

|

LAT: 34.0522 N / LNG: 118.2437 W

</div>


</div>





<div className="login-card">


<h2>
Authorization Required
</h2>


<p>
Enter credentials to access telemetry data.
</p>



<form onSubmit={handleSubmit}>


<label>
Operator ID / Email
</label>


<input

type="email"

placeholder="admin@test.com"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>




<label>

Security Key

</label>


<input

type="password"

placeholder="password123"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>



<div className="remember">

<input type="checkbox"/>

Maintain session

</div>




<button>

→ INITIATE UPLINK

</button>



</form>


{
error &&
<p className="error">
{error}
</p>
}



<footer>

Restricted Access. Authorized Personnel Only.

<br/>

© 2026 FleetDesk Enterprise.

</footer>


</div>


</div>


</div>


)

}
