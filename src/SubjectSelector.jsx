import { useState } from "react";

export default function SubjectSelector({ subjects, onSelect, onAddSubject }) {
  const [showInput, setShowInput] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newColor, setNewColor] = useState("#4e79a7");

  return (
    <div style={{ marginBottom: "20px" }}>
      <h3>科目を選択</h3>

      {/* ★ subjects が空でなければ表示する（新しく追加した科目だけ表示される） */}
      {subjects.length > 0 &&
        subjects.map((s) => (
          <button
            key={s.name}
            className="btn"
            style={{
              background: s.color,
              color: "white",
              width: "100%",
              marginBottom: "8px",
              fontWeight: "600"
            }}
            onClick={() => onSelect(s)}
          >
            {s.name}
          </button>
        ))}

      {/* 新しい科目を追加するボタン */}
      {!showInput && (
        <button
          className="btn btn-reset"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={() => setShowInput(true)}
        >
          ＋ 新しい科目を追加
        </button>
      )}

      {/* 新規科目入力欄 */}
      {showInput && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="例: 世界史"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px"
            }}
          />

          <label>色を選択</label>
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            style={{ width: "100%", height: "40px", marginBottom: "10px" }}
          />

          <button
            className="btn btn-start"
            style={{ width: "100%" }}
            onClick={() => {
              if (!newSubject.trim()) return;

              onAddSubject({ name: newSubject.trim(), color: newColor });

              setNewSubject("");
              setNewColor("#4e79a7");
              setShowInput(false);
            }}
          >
            作成する
          </button>

          <button
            className="btn btn-reset"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={() => {
              setShowInput(false);
              setNewSubject("");
              setNewColor("#4e79a7");
            }}
          >
            キャンセル
          </button>
        </div>
      )}
    </div>
  );
}
