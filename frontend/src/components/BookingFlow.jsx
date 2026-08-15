const flow = [{ label: "Pending", value: "142", color: "amber" }, { label: "Approved", value: "854", color: "cyan" }, { label: "Rejected", value: "21", color: "red" }];
export default function BookingFlow() {
  return <article className="glass-card booking-flow"><div className="card-heading"><div><p>Booking flow</p><h2>Approval status</h2></div><button type="button">View all →</button></div><div className="flow-list">{flow.map((item) => <div className="flow-item" key={item.label}><span className={`status-dot ${item.color}`} /> <p>{item.label}</p><strong>{item.value}</strong><i>{item.label === "Approved" ? "84%" : item.label === "Pending" ? "14%" : "2%"}</i></div>)}</div></article>;
}
