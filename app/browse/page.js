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
      <aside style={sidebarStyle}>
        <h2 style={{ color: '#2e0d30', marginBottom: '3rem', fontSize: '1.2rem' }}>🐼 Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <a href="/browse" style={{ ...sidebarLinkStyle, backgroundColor: '#f0f0f0', border: '2px solid #2e0d30' }}>🔍 Browse Work</a>
          <a href="/submit" style={sidebarLinkStyle}>📤 Submit Work</a>
          <a href="/feedbacks" style={sidebarLinkStyle}>💬 Community</a>
        </nav>
        <a href="/logout" style={logoutButtonStyle}>Logout 🐾</a>
      </aside>

      <main style={{ marginLeft: '260px', flex: 1, padding: '3rem' }}>
        <h1 style={{ color: '#2e0d30', marginBottom: '2rem' }}>Explore Projects</h1>
        {loading ? <p>Waking up the pandas...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {works.map(work => (
              <div key={work.id} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={categoryBadgeStyle}>{work.category}</span>
                  {/* PROFESSIONAL ADDITION: Author Tag */}
                  <span style={{ fontSize: '0.75rem', color: '#3f3554', fontWeight: 600 }}>👤 {work.author_name || 'Member Panda'}</span>
                </div>
                
                <h2 style={{ color: '#2e0d30', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{work.title}</h2>
                <p style={{ color: '#3f3554', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{work.description}</p>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  {work.link && (
                    <a href={work.link} target="_blank" rel="noreferrer" style={viewButtonStyle}>👀 View</a>
                  )}
                  <a href="/feedback" style={feedbackButtonStyle}>Review →</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

const sidebarStyle = { width: '260px', backgroundColor: 'white', borderRight: '4px solid #2e0d30', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', position: 'fixed', height: '100vh', zIndex: 100 };
const sidebarLinkStyle = { textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem', borderRadius: '1rem' };
const logoutButtonStyle = { marginTop: 'auto', padding: '1rem', backgroundColor: '#ff8bb1', color: '#2e0d30', borderRadius: '1.5rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', border: '3px solid #2e0d30' };
const cardStyle = { backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '3px solid #2e0d30', boxShadow: '5px 5px 0px #2e0d30', display: 'flex', flexDirection: 'column' };
const categoryBadgeStyle = { fontSize: '0.7rem', backgroundColor: '#59cd49', color: '#2e0d30', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontWeight: 700 };
const viewButtonStyle = { flex: 1, textAlign: 'center', padding: '0.6rem', backgroundColor: '#f0f0f0', borderRadius: '2rem', textDecoration: 'none', color: '#2e0d30', border: '2px solid #2e0d30', fontWeight: 600 };
const feedbackButtonStyle = { flex: 1, textAlign: 'center', padding: '0.6rem', backgroundColor: '#2e0d30', borderRadius: '2rem', textDecoration: 'none', color: 'white', fontWeight: 600 };