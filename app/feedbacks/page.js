'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeedbacks() {
      const { data } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setFeedbacks(data)
      setLoading(false)
    }
    fetchFeedbacks()
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <a href="/" className="font-semibold text-gray-900">Portfolio Critique</a>
        <div className="flex gap-4 items-center">
          <a href="/browse" className="text-sm text-gray-500 hover:text-gray-900">Browse work</a>
          <a href="/submit" className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800">Submit work</a>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Community feedback</h1>
        <p className="text-sm text-gray-500 mb-8">See what the community is saying about submitted work.</p>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-gray-400 text-sm">No feedback yet — be the first to give some!</p>
        ) : (
          <div className="flex flex-col gap-6">
            {feedbacks.map((f) => (
              <div key={f.id} className="border border-gray-100 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-900">{f.author}</span>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(n => (
                      <div key={n} className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${n <= f.rating ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">What works</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{f.what_works}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">What to improve</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{f.improve}</p>
                </div>
                <p className="text-xs text-gray-300 mt-4">{new Date(f.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}