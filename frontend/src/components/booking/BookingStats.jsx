import { Activity, ClipboardList, ShieldAlert } from "lucide-react";

const stats = [
  { label: "Total Requests", value: "1,248", footer: "+12% this week", icon: ClipboardList, tone: "blue" },
  { label: "Pending Approval", value: "42", footer: "Require Level 2 Auth", icon: ShieldAlert, tone: "yellow" },
  { label: "Fleet Utilization", value: "87%", footer: "Optimal range", icon: Activity, tone: "cyan" },
];

export default function BookingStats() {
  return <section className="booking-monitoring-stats" aria-label="Booking statistics">{stats.map(({ label, value, footer, icon: Icon, tone }) => <article className={`booking-monitoring-stat stat-tone--${tone}`} key={label}><div className="monitoring-stat-top"><span><Icon size={17} /></span><i><b /><b /><b /><b /><b /><b /></i></div><p>{label}</p><strong>{value}</strong><small>{footer}</small></article>)}</section>;
}
