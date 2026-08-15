export default function StatCard({
  label,
  value,
  icon,
  tone,
  note
}) {

  return (

    <article className={`stat-card stat-card--${tone}`}>

      <div className="stat-icon">
        {icon}
      </div>


      <div className="stat-content">

        <p className="stat-label">
          {label}
        </p>


        <h3 className="stat-value">
          {value}
        </h3>


        <span className="stat-note">
          {note}
        </span>

      </div>


    </article>

  );

}