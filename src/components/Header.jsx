import React from 'react'

function Header() {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
        Live Soccer Match Analyzer
      </h1>
      <p className="mt-3 text-blue-200/80 max-w-2xl mx-auto">
        Search two teams playing right now or coming up, then get form-based odds, expected goals, and likely scorers.
      </p>
    </div>
  )
}

export default Header
