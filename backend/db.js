const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("factory.db", (err) => {
  if (err) {
    console.error("DB Error:", err.message);
  } else {
    console.log("Connected to SQLite DB");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS workers (
      id TEXT PRIMARY KEY,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS workstations (
      id TEXT PRIMARY KEY,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT,
      worker_id TEXT,
      workstation_id TEXT,
      event_type TEXT,
      confidence REAL,
      count INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;