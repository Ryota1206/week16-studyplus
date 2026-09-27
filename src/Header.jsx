export default function Header({ current, onChange }) {
  return (
    <nav>
      <button
        className={current === "timer" ? "active" : ""}
        onClick={() => onChange("timer")}
      >
        タイマー
      </button>

      <button
        className={current === "stats" ? "active" : ""}
        onClick={() => onChange("stats")}
      >
        統計
      </button>

      <button
        className={current === "mypage" ? "active" : ""}
        onClick={() => onChange("mypage")}
      >
        マイページ
      </button>
    </nav>
  );
}

