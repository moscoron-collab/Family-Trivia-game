import React, { useEffect, useState } from "react";
import { getStats } from "../firebase/room";
import { TOPICS, topicLabelById } from "../services/questionService";
import { useLang, useT } from "../i18n.jsx";

const DIFF_LABEL_KEY = { easy: "diffEasy", medium: "diffMedium", hard: "diffHard" };

function StatCard({ label, value }) {
  return (
    <div className="card-glass" style={{ padding: "0.625rem 0.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--accent-purple-light)" }}>{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

// Shows a player's all-time stats. Pass the player's uid.
export default function StatsTable({ uid }) {
  const { lang } = useLang();
  const tr = useT();
  const [stats, setStats] = useState(undefined); // undefined = loading

  useEffect(() => {
    let alive = true;
    getStats(uid)
      .then((s) => { if (alive) setStats(s); })
      .catch(() => { if (alive) setStats(null); });
    return () => { alive = false; };
  }, [uid]);

  if (stats === undefined) {
    return <p className="text-sm text-muted text-center">…</p>;
  }
  if (!stats || !stats.games) {
    return <p className="text-sm text-muted text-center">{tr("statsNone")}</p>;
  }

  const games = stats.games || 0;
  const points = stats.points || 0;
  const avg = games ? Math.round(points / games) : 0;
  const byTopic = stats.byTopic || {};
  const byDiff = stats.byDifficulty || {};

  let totCorrect = 0, totAnswered = 0;
  Object.values(byTopic).forEach((v) => { totCorrect += v.correct || 0; totAnswered += v.total || 0; });
  const accuracy = totAnswered ? Math.round((totCorrect / totAnswered) * 100) : 0;

  const topicRows = Object.entries(byTopic).map(([tid, v]) => ({
    tid,
    label: topicLabelById(tid, lang),
    pct: v.total ? Math.round((v.correct / v.total) * 100) : 0,
  })).sort((a, b) => b.pct - a.pct);

  const playedIds = new Set(Object.keys(byTopic));
  const notPlayed = TOPICS.filter((t) => t.id !== "random" && !playedIds.has(t.id));

  return (
    <div className="stack stack-md">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
        <StatCard label={tr("statsGames")} value={games} />
        <StatCard label={tr("statsPoints")} value={points} />
        <StatCard label={tr("statsWins")} value={stats.wins || 0} />
        <StatCard label={tr("statsAvg")} value={avg} />
        <StatCard label={tr("statsBest")} value={stats.bestScore || 0} />
        <StatCard label={tr("statsAccuracy")} value={`${accuracy}%`} />
      </div>

      <div>
        <h4 className="mb-sm">{tr("statsByDifficulty")}</h4>
        <div className="row gap-sm" style={{ flexWrap: "wrap" }}>
          {["easy", "medium", "hard"].map((d) => (
            <span key={d} className="badge badge-purple">
              {tr(DIFF_LABEL_KEY[d])}: {byDiff[d] || 0}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-sm">{tr("statsByTopic")}</h4>
        <div className="topic-strength-bar stack stack-sm">
          {topicRows.map((t) => (
            <div key={t.tid} className="topic-strength-row">
              <span className="topic-strength-label">{t.label}</span>
              <div className="topic-bar-bg">
                <div
                  className={`topic-bar-fill ${t.pct >= 70 ? "strong" : t.pct >= 40 ? "medium" : "weak"}`}
                  style={{ width: `${t.pct}%` }}
                />
              </div>
              <span className={`topic-bar-pct ${t.pct >= 70 ? "text-green" : t.pct >= 40 ? "text-yellow" : "text-red"}`}>
                {t.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {notPlayed.length > 0 && (
        <div>
          <h4 className="mb-sm">{tr("statsNotPlayed")}</h4>
          <div className="row gap-sm" style={{ flexWrap: "wrap" }}>
            {notPlayed.map((t) => (
              <span key={t.id} className="badge" style={{ background: "var(--bg-glass)", color: "var(--text-muted)" }}>
                {topicLabelById(t.id, lang)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
