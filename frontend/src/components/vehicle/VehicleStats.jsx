import { CarFront, RefreshCw, Wrench } from "lucide-react";

const statItems = [
  { label: "Active Fleet", value: "142", detail: "/ 150", icon: CarFront, tone: "cyan" },
  { label: "In Maintenance", value: "5", detail: "Critical", icon: Wrench, tone: "warning" },
  { label: "Sync Status", value: "99.9%", detail: "Uptime", icon: RefreshCw, tone: "blue" },
];

export default function VehicleStats() {
  return <section className="vehicle-stats" aria-label="Vehicle summary">{statItems.map(({ label, value, detail, icon: Icon, tone }) => <article className={`vehicle-stat vehicle-stat--${tone}`} key={label}><span className="vehicle-stat__icon"><Icon size={19} /></span><p>{label}</p><div><strong>{value}</strong><span>{detail}</span></div></article>)}</section>;
}
