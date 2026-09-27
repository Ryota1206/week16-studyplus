import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function SubjectPieChart({ records }) {
  const canvasRef = useRef(null);

  const getSubjectTotals = () => {
    const totals = {};
    records.forEach(r => {
      totals[r.subject] = (totals[r.subject] || 0) + r.minutes;
    });
    return totals;
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const totals = getSubjectTotals();

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(totals),
        datasets: [{
          data: Object.values(totals),
          backgroundColor: ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"]
        }]
      }
    });
  }, [records]);

  return (
    <div className="card">
      <h2>科目別の勉強時間</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
