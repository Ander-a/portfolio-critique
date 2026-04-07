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
    <main style={{ backgroundColor: '#59cd49', minHeight: '100vh', fontFamily: 'Poppins, sans-serif', paddingBottom: '3rem' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', backgroundColor: 'white', borderBottom: '4px solid #2e0d30' }}>
        <a href="/" style={{ textDecoration: 'none', fontWeight: 600, color: '#2e0d30' }}>🐼 Home</a>
        <a href="/submit" style={{ textDecoration: 'none', padding: '0.5rem 1.2rem', backgroundColor: '#2e0d30', color: 'white', borderRadius: '2rem' }}>+ Submit Work</a>
      </nav>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ color: '#2e0d30', marginBottom: '2rem' }}>Explore Projects</h1>
        
        {loading ? <p>Waking up the pandas...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
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
      </div>
    </main>
  )
}