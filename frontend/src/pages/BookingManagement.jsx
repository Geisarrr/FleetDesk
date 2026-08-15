import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import BookingStepper from "../components/booking/BookingStepper";
import MissionSummary from "../components/booking/MissionSummary";
import GridStatus from "../components/booking/GridStatus";
import VehicleSelector from "../components/booking/VehicleSelector";
import VehicleCalendar from "../components/booking/calendar/VehicleCalendar";
import "../styles/dashboard.css";
import "../styles/booking.css";

export default function BookingManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("V-702");
  const [selectedDate, setSelectedDate] = useState("2023-10-24");

  return <div className="fleet-dashboard booking-page"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="dashboard-content booking-content"><TopNavbar onMenuClick={() => setSidebarOpen(true)} /><section className="booking-header"><div><p className="booking-kicker">Dispatch workflow</p><h1>New Dispatch Request</h1><p>Configure mission parameters and assign operational assets for remote deployment.</p></div><div className="booking-header-actions"><button type="button" className="cancel-request">Cancel</button><button type="button" className="submit-request" disabled>Submit Request</button></div></section><BookingStepper /><section className="booking-layout"><aside className="booking-sidebar"><MissionSummary /><GridStatus /></aside><VehicleSelector selectedVehicle={selectedVehicle} onSelectVehicle={setSelectedVehicle} /></section><section className="availability-check"><header><div><p>Asset planning</p><h2>Vehicle Availability Check</h2></div><span>Selected date: {selectedDate}</span></header><VehicleCalendar selectedDate={selectedDate} onDateSelect={setSelectedDate} /></section></main></div>;
}
