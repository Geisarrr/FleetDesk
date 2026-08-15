import { useState } from "react";
import CalendarToolbar from "./CalendarToolbar";
import CalendarLegend from "./CalendarLegend";
import CalendarGrid from "./CalendarGrid";
import "../../../styles/vehicle-calendar.css";
const vehicles = [
  { name: "Toyota Hilux", status: "available", events: [{ type: "booked", startDay: 0, endDay: 2, title: "J. Smith - Site A", requester: "J. Smith", route: "Site A", date: "24 Oct - 26 Oct" }] },
  { name: "Ford Ranger", status: "maintenance", events: [{ type: "maintenance", startDay: 1, endDay: 1, title: "Service", requester: "Fleet Ops", route: "Main workshop", date: "25 Oct" }] },
  { name: "Chevy Colorado", status: "booked", events: [{ type: "booked", startDay: 3, endDay: 6, title: "Team B", requester: "Team B", route: "Regional HQ", date: "27 Oct - 30 Oct" }] },
  { name: "Isuzu D-Max", status: "available", events: [] },
];
export default function VehicleCalendar({ selectedDate, onDateSelect, canCreateBooking = true, onNewBooking }) { const [view, setView] = useState("week"); const [event, setEvent] = useState(null); const selectDate = onDateSelect || (() => {}); return <section className="vehicle-calendar"><CalendarToolbar view={view} onViewChange={setView} canCreateBooking={canCreateBooking} onNewBooking={onNewBooking} /><CalendarLegend /><CalendarGrid vehicles={vehicles} selectedDate={selectedDate} onDateSelect={selectDate} onEventSelect={setEvent} />{event && <><button className="calendar-drawer-overlay" type="button" aria-label="Close schedule detail" onClick={() => setEvent(null)} /><aside className="calendar-detail-drawer"><header><div><p>Vehicle schedule detail</p><h2>{event.vehicle}</h2></div><button type="button" onClick={() => setEvent(null)}>×</button></header><dl><div><dt>Status</dt><dd><span className={event.type}>{event.type === "booked" ? "Booked" : "Maintenance"}</span></dd></div><div><dt>Requester</dt><dd>{event.requester}</dd></div><div><dt>Route</dt><dd>{event.route}</dd></div><div><dt>Date</dt><dd>{event.date}</dd></div></dl></aside></>}</section>; }
