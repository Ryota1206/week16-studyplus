import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function MonthlyLineChart({ records }) {
  const canvasRef = useRef(null);

  const getMonthlyData = () => {
    const result = {};
    records.forEach(r => {
      const month = r.date.slice(0, 7); // YYYY-MM
      result[month] = (result[month] || 0) + r.minutes;
    });
    return result;
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const monthly = getMonthlyData();

    new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(monthly),
        datasets: [{
          label: "月間勉強時間（分）",
          data: Object.values(monthly),
          borderColor: "#4e79a7",
          tension: 0.3
        }]
      }
    });
  }, [records]);

  return (
    <div className="card">
      <h2>月間の勉強時間</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
