import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import Login from "./pages/login";

import Dashboard from "./pages/Dashboard";

import VehicleManagement from "./pages/VehicleManagement";

import DriverManagement from "./pages/DriverManagement";

import BookingManagement from "./pages/BookingManagement";

import BookingMonitoring from "./pages/BookingMonitoring";

import CreateBooking from "./pages/CreateBooking";

import ApprovalDashboard from "./pages/ApprovalDashboard";

import ApprovalHistory from "./pages/ApprovalHistory";

import Analytics from "./pages/Analytics";

import ActivityLog from "./pages/ActivityLog";


import ProtectedRoute from "./components/ProtectedRoute";



function App() {


return (

<BrowserRouter>


<Routes>



{/* =================
    AUTH
================= */}


<Route
path="/"
element={<Login />}
/>


<Route
path="/login"
element={<Login />}
/>





{/* =================
    DASHBOARD
================= */}


<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
}
/>





{/* =================
    VEHICLE
================= */}


<Route
path="/fleet"
element={
<ProtectedRoute>
<VehicleManagement />
</ProtectedRoute>
}
/>





{/* =================
    DRIVER
================= */}


<Route
path="/drivers"
element={
<ProtectedRoute>
<DriverManagement />
</ProtectedRoute>
}
/>





{/* =================
    BOOKING
================= */}


<Route
path="/booking"
element={
<ProtectedRoute>
<BookingMonitoring />
</ProtectedRoute>
}
/>


<Route
path="/booking/manage"
element={
<ProtectedRoute>
<BookingManagement />
</ProtectedRoute>
}
/>


<Route
path="/booking/create"
element={
<ProtectedRoute>
<CreateBooking />
</ProtectedRoute>
}
/>



{/* =================
    APPROVAL
================= */}


<Route
path="/approval"
element={
<ProtectedRoute>
<ApprovalDashboard />
</ProtectedRoute>
}
/>



<Route
path="/approval/history/:id"
element={
<ProtectedRoute>
<ApprovalHistory />
</ProtectedRoute>
}
/>





{/* =================
    ANALYTICS
================= */}


<Route
path="/analytics"
element={
<ProtectedRoute>
<Analytics />
</ProtectedRoute>
}
/>





{/* =================
    SYSTEM
================= */}


<Route
path="/system/activity-log"
element={
<ProtectedRoute>
<ActivityLog />
</ProtectedRoute>
}
/>



</Routes>


</BrowserRouter>

);

}


export default App;