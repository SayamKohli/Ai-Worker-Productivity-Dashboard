const db = require("./db");

function seedData(done) {
  db.serialize(() => {
    db.run("DELETE FROM events");
    db.run("DELETE FROM workers");
    db.run("DELETE FROM workstations");

    for (let i = 1; i <= 6; i++) {
      db.run("INSERT INTO workers (id, name) VALUES (?, ?)", [
        `W${i}`,
        `Worker ${i}`
      ]);
    }

    for (let i = 1; i <= 6; i++) {
      db.run("INSERT INTO workstations (id, name) VALUES (?, ?)", [
        `S${i}`,
        `Station ${i}`
      ]);
    }

    const types = ["working", "idle", "product_count"];
    let time = new Date("2026-01-15T08:00:00Z");

    let completed = 0;
    const total = 200;

    for (let i = 0; i < total; i++) {
      const worker = `W${Math.ceil(Math.random() * 6)}`;
      const station = `S${Math.ceil(Math.random() * 6)}`;
      const type = types[Math.floor(Math.random() * types.length)];

      db.run(
        `INSERT INTO events (timestamp, worker_id, workstation_id, event_type, confidence, count)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          new Date(time).toISOString(),
          worker,
          station,
          type,
          Math.random(),
          type === "product_count" ? Math.ceil(Math.random() * 5) : 0
        ],
        () => {
          completed++;
          if (completed === total && done) done();
        }
      );

      time.setMinutes(time.getMinutes() + 5);
    }
  });
}

module.exports = seedData;