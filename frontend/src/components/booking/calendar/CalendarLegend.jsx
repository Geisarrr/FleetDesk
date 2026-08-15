const items = [["available", "Available"], ["booked", "Booked"], ["maintenance", "Maintenance"]];
export default function CalendarLegend() { return <div className="calendar-legend">{items.map(([type, label]) => <span key={type}><i className={type} />{label}</span>)}</div>; }
