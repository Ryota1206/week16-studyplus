import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Stats({ records }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    const totals = {};
    records.forEach((r) => {
      if (!totals[r.subject]) {
        totals[r.subject] = { minutes: 0, color: r.color || "#4e79a7" };
      }
      totals[r.subject].minutes += r.minutes;
    });

    const labels = Object.keys(totals);
    const data = labels.map((l) => totals[l].minutes);
    const colors = labels.map((l) => totals[l].color);

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "勉強時間（分）",
            data,
            backgroundColor: colors
          }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }, [records]);

  return (
    <div className="card">
      <h2>科目別の勉強時間</h2>
      <canvas ref={canvasRef} width={400} height={200}></canvas>
    </div>
  );
}
