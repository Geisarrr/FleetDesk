import { useEffect, useMemo, useState } from "react";
import { Download, Filter } from "lucide-react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import ActivityHeader from "../components/activity/ActivityHeader";
import ActivityFilter from "../components/activity/ActivityFilter";
import ActivityTable from "../components/activity/ActivityTable";
import ActivityPagination from "../components/activity/ActivityPagination";
import ActivityDrawer from "../components/activity/ActivityDrawer";
import { exportActivityLogs, filterActivityLogs, getActivityLogs } from "../services/activityService";
import "../styles/dashboard.css";
import "../styles/activity-log.css";
const initialFilters = { dateRange: "Last 30 Days", userType: "All Types", action: "All Actions", entityType: "All Entities", search: "" };
const summary = [["Today's Events", "245"], ["Failed Login", "12"], ["Vehicle Alerts", "8"], ["Booking Actions", "126"]];
function getCanExportActivityLog() { try { const user = JSON.parse(localStorage.getItem("user") || "{}"); return (user.role?.name ?? user.role) !== "Approver"; } catch { return true; } }
export default function ActivityLog() { const [sidebarOpen, setSidebarOpen] = useState(false); const [filterOpen, setFilterOpen] = useState(false); const [filters, setFilters] = useState(initialFilters); const [logs, setLogs] = useState([]); const [selected, setSelected] = useState(null); const [page, setPage] = useState(1); useEffect(() => { getActivityLogs().then(setLogs); }, []); const filteredLogs = useMemo(() => filterActivityLogs(logs, filters), [logs, filters]); const canExportActivityLog = getCanExportActivityLog(); return <div className="fleet-dashboard activity-page"><Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="dashboard-content activity-content"><TopNavbar onMenuClick={() => setSidebarOpen(true)} searchPlaceholder="Search logs..." onSearchChange={(search) => setFilters((current) => ({ ...current, search }))} /><ActivityHeader /><section className="activity-actions"><button type="button" onClick={() => setFilterOpen((open) => !open)}><Filter size={15} /> Filter</button><ActivityFilter open={filterOpen} filters={filters} onChange={setFilters} /><button type="button" className="export-activity" disabled={!canExportActivityLog} onClick={exportActivityLogs}><Download size={15} /> Export CSV</button></section><section className="activity-overview"><header><p>Activity Overview</p></header>{summary.map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section><section className="activity-log-card"><header><div><p>System audit registry</p><h2>System Events</h2></div><span>{filteredLogs.length} events</span></header><ActivityTable logs={filteredLogs} onSelect={setSelected} /><ActivityPagination page={page} onPageChange={setPage} /></section></main><ActivityDrawer log={selected} onClose={() => setSelected(null)} /></div>; }
