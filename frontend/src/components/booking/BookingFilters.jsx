export default function BookingFilters({ activeTab, onTabChange }) {
  return <nav className="booking-tabs" aria-label="Booking filters">{["All", "Pending", "Exceptions"].map((tab) => <button className={activeTab === tab ? "active" : ""} type="button" key={tab} onClick={() => onTabChange(tab)}>{tab}</button>)}</nav>;
}
