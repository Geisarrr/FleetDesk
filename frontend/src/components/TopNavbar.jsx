export default function TopNavbar({ onMenuClick, searchPlaceholder = "Search fleet, booking...", onSearchChange }) {
  return (
    <header className="top-navbar">
      <button className="menu-button" onClick={onMenuClick} aria-label="Open navigation">☰</button>
      <div className="top-title">Fleet Overview <span>/ Dashboard</span></div>
      <div className="top-actions">
        <label className="search-box"><span>⌕</span><input type="search" placeholder={searchPlaceholder} onChange={(event) => onSearchChange?.(event.target.value)} /></label>
        <button className="circle-button" aria-label="Notifications">♧<i /></button>
        <button className="circle-button" aria-label="Help">?</button>
        <button className="user-profile" type="button"><span>AJ</span><div><strong>Alex Johnson</strong><small>Fleet Manager</small></div><b>⌄</b></button>
      </div>
    </header>
  );
}
