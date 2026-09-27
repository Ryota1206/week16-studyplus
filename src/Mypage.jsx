import { useState, useEffect } from "react";

export default function MyPage() {
  const [profile, setProfile] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    return (
      saved || {
        gender: "",
        birthday: "",
        prefecture: "",
        grade: "",
        job: "",
        intro: "",
        goal: ""
      }
    );
  });

  const update = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  return (
    <div className="card">
      <h2>マイページ</h2>

      <h3>基本情報</h3>

      <label>性別</label>
      <select
        value={profile.gender}
        onChange={(e) => update("gender", e.target.value)}
      >
        <option value="">選択してください</option>
        <option value="男性">男性</option>
        <option value="女性">女性</option>
        <option value="その他">その他</option>
      </select>

      <label>誕生日</label>
      <input
        type="date"
        value={profile.birthday}
        onChange={(e) => update("birthday", e.target.value)}
      />

      <label>都道府県</label>
      <input
        type="text"
        value={profile.prefecture}
        onChange={(e) => update("prefecture", e.target.value)}
      />

      <label>学年</label>
      <input
        type="text"
        value={profile.grade}
        onChange={(e) => update("grade", e.target.value)}
      />

      <label>職業</label>
      <input
        type="text"
        value={profile.job}
        onChange={(e) => update("job", e.target.value)}
      />

      <h3>自己紹介</h3>
      <textarea
        value={profile.intro}
        onChange={(e) => update("intro", e.target.value)}
        rows={4}
      />

      <h3>達成目標</h3>
      <textarea
        value={profile.goal}
        onChange={(e) => update("goal", e.target.value)}
        rows={4}
      />

      <button
        className="btn btn-start"
        style={{ width: "100%", marginTop: "20px" }}
      >
        保存済み
      </button>
    </div>
  );
}

