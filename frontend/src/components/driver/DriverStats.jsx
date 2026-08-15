import { CheckCircle2, TriangleAlert, Users } from "lucide-react";

const stats = [
  { label: "Total Drivers", value: "248", icon: Users, tone: "standard" },
  { label: "Active", value: "215", icon: CheckCircle2, tone: "active" },
  { label: "License Expiring Soon", value: "12", icon: TriangleAlert, tone: "warning" },
];

export default function DriverStats() {
  return <section className="driver-stats" aria-label="Driver summary">{stats.map(({ label, value, icon: Icon, tone }) => <article className={`driver-stat driver-stat--${tone}`} key={label}><span><Icon size={19} /></span><div><p>{label}</p><strong>{value}</strong></div></article>)}</section>;
}
