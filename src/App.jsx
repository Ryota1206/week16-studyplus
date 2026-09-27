import { useState, useEffect } from "react";
import Header from "./Header";
import Timer from "./Timer";
import Stats from "./Stats";
import SubjectSelector from "./SubjectSelector";
import MyPage from "./Mypage";
import "./style.css";

export default function App() {
  const [page, setPage] = useState("timer");
  const [records, setRecords] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // 初期科目（国語・数学・英語・理科・社会）
  const [subjects, setSubjects] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("subjects"));
    return (
      saved || [
        { name: "国語", color: "#d95f02" },
        { name: "数学", color: "#1b9e77" },
        { name: "英語", color: "#7570b3" },
        { name: "理科", color: "#e7298a" },
        { name: "社会", color: "#66a61e" }
      ]
    );
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("records") || "[]");
    setRecords(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  return (
    <div>
      <Header current={page} onChange={setPage} />

      {page === "timer" && (
        <>
          {!selectedSubject && (
            <div className="card">
              <h2>科目を選択してください</h2>

              <SubjectSelector
                subjects={subjects}
                onSelect={setSelectedSubject}
                onAddSubject={(newSubject) =>
                  setSubjects([...subjects, newSubject])
                }
              />
            </div>
          )}

          {selectedSubject && (
            <Timer
              subject={selectedSubject}
              records={records}
              setRecords={setRecords}
              resetSubject={() => setSelectedSubject(null)}
            />
          )}
        </>
      )}

      {page === "stats" && <Stats records={records} />}

      {page === "mypage" && <MyPage />}
    </div>
  );
}
