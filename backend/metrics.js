const db = require("./db");

function computeMetrics(callback) {
  db.all("SELECT * FROM workers", (err, workers) => {
    if (err) return callback(err);

    db.all("SELECT * FROM workstations", (err, stations) => {
      if (err) return callback(err);

      db.all("SELECT * FROM events ORDER BY timestamp", (err, events) => {
        if (err) return callback(err);

        const workerMap = {};
        const stationMap = {};

        // initialize
        workers.forEach(w => {
          workerMap[w.id] = { ...w, active: 0, idle: 0, units: 0 };
        });

        stations.forEach(s => {
          stationMap[s.id] = { ...s, active: 0, units: 0 };
        });

        // compute durations
        for (let i = 0; i < events.length - 1; i++) {
          const curr = events[i];
          const next = events[i + 1];

          const duration =
            (new Date(next.timestamp) - new Date(curr.timestamp)) / 3600000;

            if (curr.event_type === "working") {
            if (workerMap[curr.worker_id]) {
                workerMap[curr.worker_id].active += duration;
            }

            if (stationMap[curr.workstation_id]) {
                stationMap[curr.workstation_id].active += duration;
            }
            }

          if (curr.event_type === "idle") {
            if (workerMap[curr.worker_id]) {
                workerMap[curr.worker_id].idle += duration;
            }
          }
          if (curr.event_type === "product_count") {
            if (workerMap[curr.worker_id]) {
                workerMap[curr.worker_id].units += curr.count;
            }

            if (stationMap[curr.workstation_id]) {
                stationMap[curr.workstation_id].units += curr.count;
            }
            }
        }

        const workerMetrics = Object.values(workerMap).map(w => ({
          ...w,
          utilization: w.active / (w.active + w.idle || 1),
          units_per_hour: w.units / (w.active || 1)
        }));

        const stationMetrics = Object.values(stationMap).map(s => ({
          ...s,
          utilization: s.active,
          throughput: s.units / (s.active || 1)
        }));

        const totalUnits = workerMetrics.reduce((a, b) => a + b.units, 0);
        const avgUtil =
          workerMetrics.reduce((a, b) => a + b.utilization, 0) /
          workerMetrics.length;

        callback(null, {
          factory: {
            totalUnits,
            avgUtil
          },
          workers: workerMetrics,
          stations: stationMetrics
        });
      });
    });
  });
}

module.exports = computeMetrics;