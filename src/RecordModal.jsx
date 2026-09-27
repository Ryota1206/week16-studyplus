export default function RecordModal({ subject, minutes, onSave, onClose }) {
  return (
    <div className="modal">
      <h2>勉強記録を保存</h2>
      <p>科目: {subject.name}</p>
      <p>時間: {minutes} 分</p>

      <button
        className="btn btn-start"
        style={{ width: "100%", marginTop: "20px" }}
        onClick={() => onSave(subject, minutes)}
      >
        保存する
      </button>

      <button
        className="btn btn-reset"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={onClose}
      >
        閉じる
      </button>
    </div>
  );
}

