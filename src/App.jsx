import React, { useState } from 'react'
import Header from './components/Header'
import TeamSearch from './components/TeamSearch'
import Analysis from './components/Analysis'
import { apiGet } from './lib/backend'

function App() {
  const [home, setHome] = useState(null)
  const [away, setAway] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const analyze = async () => {
    if (!home || !away) return
    setLoading(true)
    setError('')
    setData(null)
    try {
      const payload = await apiGet(`/api/analyze?home_id=${encodeURIComponent(home.id)}&away_id=${encodeURIComponent(away.id)}`)
      setData(payload)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.07),transparent_50%)]"></div>

      <div className="relative max-w-5xl mx-auto p-6 md:p-10">
        <Header />

        <div className="grid md:grid-cols-2 gap-6">
          <TeamSearch label="Home team" onSelect={(t) => setHome(t)} />
          <TeamSearch label="Away team" onSelect={(t) => setAway(t)} />
        </div>

        <div className="mt-4 flex items-center gap-3 text-blue-200">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${home ? 'bg-green-500' : 'bg-slate-500'}`}></div>
            <span className="text-sm">{home ? home.name : 'Pick home team'}</span>
          </div>
          <span className="opacity-50">vs</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${away ? 'bg-green-500' : 'bg-slate-500'}`}></div>
            <span className="text-sm">{away ? away.name : 'Pick away team'}</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={analyze}
            disabled={!home || !away || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg"
          >
            {loading ? 'Analyzing…' : 'Analyze match'}
          </button>
        </div>

        <div className="mt-8">
          {error && <div className="text-red-400">{error}</div>}
          {data && <Analysis data={data} />}
        </div>

        <div className="mt-16 text-center text-blue-300/70 text-sm">
          This is an estimation based on public historical data. For entertainment and exploration only.
        </div>
      </div>
    </div>
  )
}

export default App
