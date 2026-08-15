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
import ApprovalHistory from "./pages/ApprovalHistory";
import Analytics from "./pages/Analytics";
import ActivityLog from "./pages/ActivityLog";
import ApprovalDashboard from "./pages/ApprovalDashboard";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route 
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/fleet"
          element={<VehicleManagement />}
        />

        <Route
          path="/drivers"
          element={<DriverManagement />}
        />

        <Route
          path="/booking"
          element={<BookingMonitoring />}
        />

        <Route
          path="/booking/create"
          element={<BookingManagement />}
        />

        <Route
          path="/approval"
          element={<ApprovalDashboard />}
        />

        <Route
          path="/approval/history/:id"
          element={<ApprovalHistory />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/system/activity-log"
          element={<ActivityLog />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;
