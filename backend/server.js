const express = require("express");
const cors = require("cors");
const db = require("./db");
const seedData = require("./seed");
const computeMetrics = require("./metrics");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/events", (req, res) => {
  const e = req.body;

  db.prepare(`
    INSERT INTO events (timestamp, worker_id, workstation_id, event_type, confidence, count)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(e.timestamp, e.worker_id, e.workstation_id, e.event_type, e.confidence, e.count || 0);

  res.send({ status: "ok" });
});

app.post("/seed", (req, res) => {
  seedData(() => {
    res.send({ status: "seeded" });
  });
});

app.get("/metrics", (req, res) => {
  computeMetrics((err, data) => {
    if (err) return res.status(500).send(err.message);
    res.send(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));