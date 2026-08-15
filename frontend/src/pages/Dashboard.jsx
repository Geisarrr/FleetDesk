import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import StatCard from "../components/StatCard";
import BookingFlow from "../components/BookingFlow";
import StatusChart from "../components/StatusChart";
import BookingTrend from "../components/BookingTrend";
import Utilization from "../components/Utilization";
import RecentBooking from "../components/RecentBooking";
import "../styles/dashboard.css";

const stats = [
  { label: "Total vehicles", value: "1,248", icon: "◆", tone: "blue", note: "+8.2% from last month" },
  { label: "Available", value: "432", icon: "◌", tone: "cyan", note: "34.6% of fleet" },
  { label: "In use", value: "781", icon: "↗", tone: "violet", note: "62.6% utilization" },
  { label: "Maintenance", value: "35", icon: "⚠", tone: "amber", note: "Requires attention" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="fleet-dashboard">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="dashboard-content">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <section className="dashboard-intro">
          <div>
            <p className="eyebrow">Operations center <span className="live-dot" /> Live fleet data</p>
            <h1>Fleet Overview</h1>
            <p>Monitor availability, bookings, and vehicle performance in one place.</p>
          </div>
          <button className="primary-action" type="button">+ New booking</button>
        </section>

        <section className="stats-grid" aria-label="Fleet statistics">
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </section>

        <section className="dashboard-grid dashboard-grid--top">
          <BookingTrend />
          <StatusChart />
          <BookingFlow />
        </section>

        <section className="dashboard-grid dashboard-grid--bottom">
          <RecentBooking />
          <Utilization />
        </section>
      </main>
    </div>
  );
}
