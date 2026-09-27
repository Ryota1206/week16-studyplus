import { useState, useEffect } from "react";
import RecordModal from "./RecordModal";

export default function Timer({ subject, records, setRecords, resetSubject }) {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let id;
    if (isRunning) {
      id = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(id);
  }, [isRunning, startTime]);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    setStartTime(Date.now() - elapsed);
  };

  const stop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    setShowModal(true);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  const sec = Math.floor(elapsed / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);

  return (
    <div className="card">
      <h2>{subject.name} の勉強</h2>

      <div className="timer-display">
        {hr}:{String(min % 60).padStart(2, "0")}:{String(sec % 60).padStart(2, "0")}
      </div>

      <div style={{ textAlign: "center" }}>
        <button className="btn btn-start" onClick={start}>Start</button>
        <button className="btn btn-stop" onClick={stop}>Stop</button>
        <button className="btn btn-reset" onClick={reset}>Reset</button>
      </div>

      {showModal && (
        <RecordModal
          subject={subject}
          minutes={Math.floor(elapsed / 1000 / 60)}
          onSave={(subjectObj, minutes) => {
            const dateStr = new Date().toISOString().split("T")[0];
            const newRecord = {
              date: dateStr,
              subject: subjectObj.name,
              color: subjectObj.color,
              minutes
            };
            setRecords([...records, newRecord]);
            setShowModal(false);
            setElapsed(0);
            resetSubject();
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
