import { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import DriverStats from "../components/driver/DriverStats";
import DriverTable from "../components/driver/DriverTable";
import "../styles/dashboard.css";
import "../styles/driver.css";

const drivers = [
  { employeeId: "EMP-0992", name: "Sarah Jenkins", initial: "SJ", phone: "+1 (555) 019-2834", license: "DL-8472-TX", expiry: "2026-11-14", site: "Houston Hub", status: "Active" },
  { employeeId: "EMP-1045", name: "Michael Rodriguez", initial: "MR", phone: "+1 (555) 837-1120", license: "DL-2938-CA", expiry: "2024-02-28", site: "LA Metro", status: "Inactive" },
  { employeeId: "EMP-0832", name: "David Kim", initial: "DK", phone: "+1 (555) 392-8841", license: "DL-5521-NY", expiry: "2025-08-10", site: "Brooklyn Yard", status: "Active" },
];

export default function DriverManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fleet-dashboard driver-page">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="dashboard-content driver-content">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <section className="driver-header">
          <div>
            <p className="driver-kicker">Operator directory</p>
            <h1>Driver Management</h1>
            <p>Manage fleet operators, licenses, and assignments.</p>
          </div>
          <button className="add-driver" type="button"><Plus size={16} /> Add Driver</button>
        </section>
        <DriverStats />
        <DriverTable drivers={drivers} total={248} />
      </main>
    </div>
  );
}
