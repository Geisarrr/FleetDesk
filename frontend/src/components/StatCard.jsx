export default function StatCard({ label, value, icon, tone, note }) {
  return <article className={`stat-card stat-card--${tone}`}><div className="stat-icon">{icon}</div><p>{label}</p><strong>{value}</strong><small>{note}</small></article>;
}
