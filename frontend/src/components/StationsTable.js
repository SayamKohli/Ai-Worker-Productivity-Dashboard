export default function StationsTable({ stations }) {
  return (
    <div className="card">
      <h2>Workstations</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Utilization</th>
            <th>Units</th>
          </tr>
        </thead>

        <tbody>
          {stations.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{(s.utilization * 100).toFixed(2)}%</td>
              <td>{s.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}