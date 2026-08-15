import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: "▦", to: "/dashboard" },
  { label: "Fleet", icon: "◇", to: "/fleet" },
  { label: "Booking", icon: "▣", to: "/booking" },
  { label: "Driver Management", icon: "♙", to: "/drivers" },
  {
 label:"Approval",
 icon:"✓",
 to:"/approval",
 badge:"12"
},
  { label: "Analytics", icon: "◔", to: "/analytics" },
  { label: "System", icon: "⊞", to: "/system/activity-log" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <button className={`sidebar-overlay ${open ? "is-visible" : ""}`} onClick={onClose} aria-label="Close navigation" />
      <aside className={`sidebar ${open ? "is-open" : ""}`}>
        <div className="sidebar-brand">
          <span className="brand-mark">F</span>
          <div><strong>FleetDesk</strong><small>Enterprise Control</small></div>
          <button className="sidebar-close" onClick={onClose} aria-label="Close navigation">×</button>
        </div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          <p>Workspace</p>
          {menuItems.map(({ label, icon, to, badge }) => to ? (
            <NavLink className="nav-item" key={label} to={to} onClick={onClose}>
              <span>{icon}</span>{label}{badge && <b>{badge}</b>}
            </NavLink>
          ) : (
            <button className="nav-item" key={label} type="button">
              <span>{icon}</span>{label}{badge && <b>{badge}</b>}
            </button>
          ))}
        </nav>
        <nav className="sidebar-nav sidebar-bottom" aria-label="Account navigation">
          <button className="nav-item" type="button"><span>◉</span>Profile</button>
          <button className="nav-item" type="button"><span>⚙</span>Settings</button>
        </nav>
        <div className="sidebar-footer"><span className="live-dot" /> All systems operational</div>
      </aside>
    </>
  );
}
