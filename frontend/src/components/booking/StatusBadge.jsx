const statusType = { Draft: "draft", "Pending L1": "pending", Approved: "approved", Active: "active", Cancelled: "cancelled" };
export default function StatusBadge({ status }) { return <span className={`booking-status ${statusType[status] ?? "draft"}`}><i />{status}</span>; }
