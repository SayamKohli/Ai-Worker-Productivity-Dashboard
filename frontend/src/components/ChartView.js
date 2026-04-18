import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ChartView({ workers }) {
  const canvasRef = useRef();

  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: workers.map(w => w.name),
        datasets: [
          {
            label: "Units Produced",
            data: workers.map(w => w.units),
          }
        ]
      }
    });

    return () => chart.destroy();
  }, [workers]);

  return (
    <div className="card">
      <h2>Production Chart</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}