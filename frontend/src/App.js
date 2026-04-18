import React, { useEffect, useState } from "react";
import { getMetrics, seedData } from "./api";
import FactorySummary from "./components/FactorySummary";
import WorkersTable from "./components/WorkersTable";
import StationsTable from "./components/StationsTable";
import ChartView from "./components/ChartView";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  // Load metrics
  const load = async () => {
    try {
      const res = await getMetrics();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-hide notice after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotice(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Initial load
  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      
      {/* 🔔 Notice Popup */}
      {showNotice && (
        <div className="notice">
          <p>
            ⚠️ Backend is hosted on free tier (Render). First request may take 30–60 seconds.
          </p>
          <button onClick={() => setShowNotice(false)}>✖</button>
        </div>
      )}


      <h1>AI Worker Productivity Dashboard</h1>

      {/* Seed Button */}
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);

          await seedData();

          // wait a bit for DB consistency
          setTimeout(async () => {
            await load();
            setLoading(false);
          }, 500);
        }}
      >
        {loading ? "Seeding..." : "Seed Data"}
      </button>

      {/* Data Views */}
      {data && (
        <>
          <FactorySummary data={data.factory} />
          <ChartView workers={data.workers} />
          <WorkersTable workers={data.workers} />
          <StationsTable stations={data.stations} />
        </>
      )}
    </div>
  );
}

export default App;