export default function FactorySummary({ data }) {
  return (
    <div className="card">
      <h2>Factory Overview</h2>

      <div className="grid">
        <div className="metric">
          <h3>Total Units</h3>
          <p>{data.totalUnits}</p>
        </div>

        <div className="metric">
          <h3>Avg Utilization</h3>
          <p>{(data.avgUtil * 100).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}