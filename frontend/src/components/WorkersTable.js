export default function WorkersTable({ workers }) {
  return (
    <div className="card">
      <h2>Workers</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Active</th>
            <th>Idle</th>
            <th>Utilization</th>
            <th>Units</th>
          </tr>
        </thead>

        <tbody>
          {workers.map(w => (
            <tr key={w.id}>
              <td>{w.name}</td>
              <td>{w.active.toFixed(2)}</td>
              <td>{w.idle.toFixed(2)}</td>
              <td>{(w.utilization * 100).toFixed(2)}%</td>
              <td>{w.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}