import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import ApprovalTimeline from "../components/approval/ApprovalTimeline";
import ApprovalStatusCard from "../components/approval/ApprovalStatusCard";
import RequestDetailCard from "../components/approval/RequestDetailCard";
import "../styles/dashboard.css";
import "../styles/approval-history.css";

const approvalHistory = [
  { title: "Booking Created", description: "Initial request submitted for Heavy Transport Unit #44.", user: { name: "Sarah Jenkins", role: "Logistics Coordinator" }, date: "Oct 24, 2023", time: "08:42 AM", status: "completed" },
  { title: "L1 Manager Approval", description: "Budget clearance and initial schedule check completed.", user: { name: "Marcus Vance", role: "Operations Director" }, date: "Oct 24, 2023", time: "11:15 AM", status: "completed" },
  { title: "L2 Security Review", description: "Route compliance and vehicle clearance verified.", user: { name: "Elena Rostova", role: "Compliance Officer" }, date: "Oct 25, 2023", time: "09:30 AM", status: "current" },
  { title: "Final Fleet Allocation", description: "Pending final dispatch assignment and telemetry sync.", status: "pending" },
];

export default function ApprovalHistory() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const exists = id === "Req-2023-8942" || id === "req-2023-8942" || id === "8942";

  useEffect(() => { const timer = setTimeout(() => setLoading(false), 350); return () => clearTimeout(timer); }, []);

  return <div className="fleet-dashboard approval-history-page"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="dashboard-content approval-history-content"><TopNavbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search approvals..." />{loading ? <div className="approval-loading"><i /><p>Loading approval trail...</p></div> : !exists ? <div className="approval-empty"><h1>Approval history not found</h1><p>The requested booking approval trail is unavailable or has been removed.</p></div> : <><section className="approval-history-header"><p>Booking authorization record</p><h1>Approval History</h1><span>Req-2023-8942 <i>•</i> Transport Logistics Fleet</span></section><section className="approval-history-layout"><article className="approval-timeline-panel"><header><p>Audit trail</p><h2>Request authorization timeline</h2></header><ApprovalTimeline steps={approvalHistory} /></article><aside className="approval-info-panel"><ApprovalStatusCard /><RequestDetailCard /></aside></section></>}</main></div>;
}
