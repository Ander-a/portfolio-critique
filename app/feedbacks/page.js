'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase.from('feedback').select('*').order('created_at', { ascending: false })
      if (data) setFeedbacks(data)
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#59cd49', fontFamily: 'Poppins, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: 'white', borderRight: '4px solid #2e0d30', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', position: 'fixed', height: '100vh' }}>
        <h2 style={{ color: '#2e0d30', marginBottom: '3rem' }}>🐼 Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <a href="/browse" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem' }}>🔍 Browse Work</a>
          <a href="/submit" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem' }}>📤 Submit Work</a>
          <a href="/feedbacks" style={{ textDecoration: 'none', color: '#2e0d30', fontWeight: 700, backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '1rem', border: '2px solid #2e0d30' }}>💬 Community</a>
        </nav>
        <a href="/logout" style={{ marginTop: 'auto', padding: '1rem', backgroundColor: '#ff8bb1', color: '#2e0d30', borderRadius: '1.5rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', border: '3px solid #2e0d30', boxShadow: '4px 4px 0px #2e0d30' }}>Logout 🐾</a>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '3rem' }}>
        <h1 style={{ color: '#2e0d30', marginBottom: '2rem' }}>Panda Peer Reviews</h1>
        <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {feedbacks.map(f => (
            <div key={f.id} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '3px solid #2e0d30', boxShadow: '6px 6px 0px #2e0d30' }}>
              <p style={{ fontWeight: 700, color: '#59cd49', marginBottom: '1rem' }}>Rating: {f.rating}/5</p>
              <p style={{ color: '#2e0d30', fontWeight: 600, marginBottom: '0.5rem' }}>What works:</p>
              <p style={{ color: '#3f3554', marginBottom: '1rem' }}>{f.what_works}</p>
              <p style={{ color: '#2e0d30', fontWeight: 600, marginBottom: '0.5rem' }}>To improve:</p>
              <p style={{ color: '#3f3554' }}>{f.improve}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}