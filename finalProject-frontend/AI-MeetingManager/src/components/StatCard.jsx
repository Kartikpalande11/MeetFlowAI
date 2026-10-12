function StatCard({
  icon,
  title,
  value,
  type
}) {

  return (

    <div className={`stat-card ${type}`}>

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">

        <span>{title}</span>

        <h2>{value}</h2>

      </div>

    </div>
  );
}

export default StatCard;