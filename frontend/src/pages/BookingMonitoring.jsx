import { useMemo, useState } from "react";
import { Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import BookingStats from "../components/booking/BookingStats";
import BookingFilters from "../components/booking/BookingFilters";
import BookingTable from "../components/booking/BookingTable";
import BookingDetailDrawer from "../components/booking/BookingDetailDrawer";
import VehicleCalendar from "../components/booking/calendar/VehicleCalendar";
import "../styles/dashboard.css";
import "../styles/booking-monitoring.css";

const bookings = [
  { id: "#BK-9024-A", initial: "SJ", requester: "Sarah Jenkins", department: "Marketing Dept", vehicle: "Unassigned", driver: "Pending Vehicle", destination: "Regional HQ", date: "Oct 24, 2023 - 09:00", status: "Draft", approval: "Initiated" },
  { id: "#BK-9025-B", initial: "MR", requester: "Marcus Reed", department: "Engineering", vehicle: "SUV - CX-90", driver: "Self-Drive", destination: "Site Alpha", date: "Oct 25, 2023 - 07:30", status: "Pending L1", approval: "Manager Review" },
  { id: "#BK-9026-C", initial: "DK", requester: "David Kim", department: "Operations", vehicle: "Van - Sprinter", driver: "R. Cole", destination: "Brooklyn Yard", date: "Oct 25, 2023 - 11:15", status: "Approved", approval: "Fleet Approved" },
  { id: "#BK-9027-D", initial: "ET", requester: "Elena Torres", department: "Logistics", vehicle: "Truck - Atlas X1", driver: "M. Lewis", destination: "West Terminal", date: "Oct 26, 2023 - 06:00", status: "Active", approval: "Dispatched" },
];

function getCanCreateBooking() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = user.role?.name ?? user.role;
    return role !== "Approver";
  } catch {
    return true;
  }
}

export default function BookingMonitoring() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const navigate = useNavigate();
  const visibleBookings = useMemo(() => bookings.filter((booking) => tab === "All" || (tab === "Pending" ? booking.status.startsWith("Pending") : ["Draft", "Cancelled"].includes(booking.status))), [tab]);

  const canCreateBooking = getCanCreateBooking();
  return <div className="fleet-dashboard booking-monitoring-page"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="dashboard-content booking-monitoring-content"><TopNavbar onMenuClick={() => setSidebarOpen(true)} /><section className="monitoring-header"><div><p className="monitoring-kicker">Fleet request command</p><h1>Booking Operations</h1><p>Monitor and manage all active fleet requests across regions.</p></div><div className="monitoring-actions"><button type="button"><Filter size={15} /> Filters</button>{canCreateBooking && <button className="new-booking-button" type="button" onClick={() => navigate("/booking/create")}><Plus size={16} /> New Booking</button>}</div></section><BookingStats /><section className="calendar-monitoring-section"><div><p>Fleet scheduling</p><h2>Vehicle Availability</h2></div><button type="button" onClick={() => setCalendarOpen((open) => !open)}>{calendarOpen ? "Hide Calendar" : "View Calendar"}</button></section>{calendarOpen && <VehicleCalendar canCreateBooking={canCreateBooking} onNewBooking={() => navigate("/booking/create")} />}<section className="booking-log-panel"><header className="booking-log-header"><div><p>Operational registry</p><h2>Active Log</h2></div><BookingFilters activeTab={tab} onTabChange={setTab} /></header><BookingTable bookings={visibleBookings} onSelectBooking={setSelectedBooking} /></section></main><BookingDetailDrawer booking={selectedBooking} onClose={() => setSelectedBooking(null)} /></div>;
}
