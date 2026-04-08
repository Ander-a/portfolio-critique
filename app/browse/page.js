'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

export default function Browse() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorks() {
      const { data } = await supabase.from('works').select('*').order('created_at', { ascending: false })
      if (data) setWorks(data)
      setLoading(false)
    }
    fetchWorks()
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#59cd49', fontFamily: 'Poppins, sans-serif' }}>
      {/* Persistent Sidebar */}
      <aside style={{ width: '260px', backgroundColor: 'white', borderRight: '4px solid #2e0d30', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', position: 'fixed', height: '100vh' }}>
        <h2 style={{ color: '#2e0d30', marginBottom: '3rem' }}>🐼 Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <a href="/browse" style={{ textDecoration: 'none', color: '#2e0d30', fontWeight: 700, backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '1rem' }}>🔍 Browse Work</a>
          <a href="/submit" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem' }}>📤 Submit Work</a>
          <a href="/feedbacks" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem' }}>💬 Community</a>
        </nav>
        <a href="/logout" style={{ marginTop: 'auto', padding: '1rem', backgroundColor: '#ff8bb1', color: '#2e0d30', borderRadius: '1.5rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', border: '3px solid #2e0d30' }}>Logout 🐾</a>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '3rem' }}>
        <h1 style={{ color: '#2e0d30', marginBottom: '2rem' }}>Explore Projects</h1>
        {loading ? <p>Waking up the pandas...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {works.map(work => (
              <div key={work.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '3px solid #2e0d30', boxShadow: '5px 5px 0px #2e0d30' }}>
                <span style={{ fontSize: '0.7rem', backgroundColor: '#59cd49', color: '#2e0d30', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontWeight: 600 }}>{work.category}</span>
                <h2 style={{ color: '#2e0d30', marginTop: '0.5rem' }}>{work.title}</h2>
                <p style={{ color: '#3f3554', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{work.description}</p>
                <a href="/feedback" style={{ color: '#59cd49', fontWeight: 700, textDecoration: 'none' }}>GIVE FEEDBACK →</a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}