'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

export default function Browse() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    async function fetchWorks() {
      const { data } = await supabase.from('works').select('*').order('created_at', { ascending: false })
      if (data) setWorks(data)
      setLoading(false)
    }
    fetchWorks()
  }, [])

  const filtered = filter === 'All' ? works : works.filter(w => w.category === filter)

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <a href="/" className="font-semibold text-gray-900">Portfolio Critique</a>
        <a href="/submit" className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800">
          Submit work
        </a>
      </nav>

      <section className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Browse work</h1>
        <p className="text-gray-500 text-sm mb-8">Give feedback and earn the right to receive it.</p>

        <div className="flex gap-2 mb-8">
          {["All", "Design", "Writing", "Code"].map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${filter === cat ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-sm">No work submitted yet. Be the first!</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((work) => (
              <div key={work.id} className="border border-gray-100 rounded-xl p-6 hover:border-gray-300 transition-colors">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{work.category}</span>
                <h2 className="font-semibold text-gray-900 mt-2 mb-1 leading-snug">{work.title}</h2>
                <p className="text-sm text-gray-400 mb-3">by {work.author}</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{work.description}</p>
                <a href="/feedback" className="text-xs font-medium text-black hover:underline">Give feedback →</a>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}