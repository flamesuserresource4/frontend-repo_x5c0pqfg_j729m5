import React, { useState } from 'react'
import { apiGet } from '../lib/backend'

function TeamSearch({ label, onSelect }) {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const search = async (value) => {
    const query = value.trim()
    setQ(value)
    setError('')
    if (query.length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const data = await apiGet(`/api/search/teams?q=${encodeURIComponent(query)}`)
      setResults(data)
      if (!Array.isArray(data) || data.length === 0) {
        setError('No teams found. Try a different name (e.g., "Barcelona", "Arsenal").')
      }
    } catch (e) {
      setError(e.message || 'Search failed')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
      <label className="block text-sm text-blue-200/80 mb-2">{label}</label>
      <input
        value={q}
        onChange={(e) => search(e.target.value)}
        placeholder="Type a team name (e.g., Real Madrid)"
        className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <p className="text-xs text-blue-300 mt-2">Searching...</p>}
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      {results.length > 0 && (
        <div className="mt-2 space-y-1 max-h-56 overflow-auto">
          {results.map((t) => (
            <button
              key={t.id}
              className="w-full text-left bg-slate-900/60 hover:bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-blue-100 flex items-center gap-3"
              onClick={() => onSelect(t)}
            >
              {t.badge && <img src={t.badge} alt="badge" className="w-6 h-6" />}
              <div>
                <div className="font-medium text-white">{t.name}</div>
                <div className="text-xs text-blue-300">{t.league || t.country || ''}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamSearch
