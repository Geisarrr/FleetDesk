import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import VehicleStats from "../components/vehicle/VehicleStats";
import VehicleFilters from "../components/vehicle/VehicleFilters";
import VehicleTable from "../components/vehicle/VehicleTable";
import "../styles/dashboard.css";
import "../styles/vehicle.css";

const vehicles = [
  { license: "ABC-1234", type: "Sedan", brand: "Toyota Camry", year: "2022", region: "North / HQ", status: "Active" },
  { license: "XYZ-9876", type: "SUV", brand: "Ford Explorer", year: "2021", region: "South / Annex", status: "Maintenance" },
  { license: "LMN-4567", type: "Van", brand: "Mercedes Sprinter", year: "2023", region: "East / Depot", status: "Active" },
  { license: "QRS-1122", type: "Sedan", brand: "Honda Accord", year: "2019", region: "West / Terminal", status: "Inactive" },
];

export default function VehicleManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [type, setType] = useState("All Types");
  const [status, setStatus] = useState("All Statuses");
  const filteredVehicles = vehicles.filter((vehicle) =>
    (type === "All Types" || vehicle.type === type) &&
    (status === "All Statuses" || vehicle.status === status),
  );

  return (
    <div className="fleet-dashboard vehicle-page">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="dashboard-content vehicle-content">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <section className="vehicle-header">
          <div>
            <p className="vehicle-kicker">Fleet registry</p>
            <h1>Vehicle Management</h1>
            <p>Manage fleet registry, status, and telemetry endpoints.</p>
          </div>
          <button className="add-vehicle" type="button"><Plus size={16} /> Add Vehicle</button>
        </section>
        <VehicleStats />
        <section className="vehicle-table-card">
          <VehicleFilters type={type} status={status} onTypeChange={setType} onStatusChange={setStatus} />
          <VehicleTable vehicles={filteredVehicles} total={vehicles.length} />
        </section>
      </main>
    </div>
  );
}
