import React from 'react'

function StatBox({ title, value, sub }) {
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
      <div className="text-sm text-blue-300/80">{title}</div>
      <div className="mt-1 text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-blue-300 mt-1">{sub}</div>}
    </div>
  )
}

function TeamCard({ stats, side }) {
  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
      <div className="flex items-center gap-3">
        {stats.team.badge && <img src={stats.team.badge} alt="badge" className="w-10 h-10" />}
        <div>
          <div className="text-white text-lg font-semibold">{stats.team.name}</div>
          <div className="text-xs text-blue-300">{stats.team.league || stats.team.country || ''}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        <StatBox title="Last 5 pts" value={stats.last5_points} sub={stats.last5_record} />
        <StatBox title="Avg GF" value={stats.avg_goals_for} />
        <StatBox title="Avg GA" value={stats.avg_goals_against} />
        <StatBox title="Clean sheets" value={stats.clean_sheets} />
      </div>
    </div>
  )
}

function ProbBar({ home, draw, away }) {
  const total = home + draw + away || 1
  const h = Math.round((home / total) * 100)
  const d = Math.round((draw / total) * 100)
  const a = Math.round((away / total) * 100)
  return (
    <div className="w-full bg-slate-900/60 rounded overflow-hidden border border-slate-700">
      <div className="flex text-xs text-white">
        <div style={{ width: `${h}%` }} className="bg-green-600 px-2 py-1">H {h}%</div>
        <div style={{ width: `${d}%` }} className="bg-yellow-600 px-2 py-1">D {d}%</div>
        <div style={{ width: `${a}%` }} className="bg-red-600 px-2 py-1">A {a}%</div>
      </div>
    </div>
  )
}

function Scorers({ list }) {
  if (!list || list.length === 0) return <p className="text-blue-300">No recent scorers detected</p>
  return (
    <ul className="space-y-1">
      {list.map((p) => (
        <li key={p.name} className="flex items-center justify-between text-blue-100">
          <span>{p.name}</span>
          <span className="text-xs">{Math.round(p.probability * 100)}% • {p.recent_goals}g</span>
        </li>
      ))}
    </ul>
  )
}

function Analysis({ data }) {
  const { home, away, expected_goals, win_probabilities, likely_scorers, methodology, source } = data
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <TeamCard stats={home} side="home" />
        <TeamCard stats={away} side="away" />
      </div>

      <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
        <div className="text-blue-200 text-sm">Expected Goals (xG)</div>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <StatBox title={home.team.name} value={expected_goals.home} />
          <StatBox title={away.team.name} value={expected_goals.away} />
        </div>
      </div>

      <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
        <div className="text-blue-200 text-sm mb-2">Win Probabilities</div>
        <ProbBar home={win_probabilities.home} draw={win_probabilities.draw} away={win_probabilities.away} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
          <div className="text-blue-200 text-sm mb-2">Likely scorers - {home.team.name}</div>
          <Scorers list={likely_scorers.home} />
        </div>
        <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
          <div className="text-blue-200 text-sm mb-2">Likely scorers - {away.team.name}</div>
          <Scorers list={likely_scorers.away} />
        </div>
      </div>

      <div className="text-xs text-blue-300/80">
        Source: {source}. Method: {methodology}
      </div>
    </div>
  )
}

export default Analysis
