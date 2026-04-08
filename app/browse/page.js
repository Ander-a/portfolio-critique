'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

export default function Browse() {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    async function fetchWorks() {
      // Fetches all projects from the 'works' table
      const { data } = await supabase.from('works').select('*').order('created_at', { ascending: false })
      if (data) setWorks(data)
      setLoading(false)
    }
    fetchWorks()
  }, [])

  // Filter logic for Design, Code, and Writing
  const filtered = filter === 'All' ? works : works.filter(w => w.category === filter)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#59cd49', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />

      {/* SIDEBAR DASHBOARD */}
      <aside style={sidebarStyle}>
        <h2 style={{ color: '#2e0d30', marginBottom: '3rem', fontSize: '1.2rem' }}>🐼 Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <a href="/browse" style={{ ...sidebarLinkStyle, backgroundColor: '#f0f0f0', border: '2px solid #2e0d30' }}>🔍 Browse Work</a>
          <a href="/submit" style={sidebarLinkStyle}>📤 Submit Work</a>
          <a href="/feedbacks" style={sidebarLinkStyle}>💬 Community</a>
        </nav>
        <a href="/logout" style={logoutButtonStyle}>Logout 🐾</a>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '3rem' }}>
        <h1 style={{ color: '#2e0d30', marginBottom: '1rem', fontSize: '2rem', fontWeight: 600 }}>Explore Projects</h1>
        <p style={{ color: '#3f3554', marginBottom: '2rem' }}>Review the work of fellow Pandas and help them grow.</p>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2.5rem' }}>
          {['All', 'Design', 'Code', 'Writing'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: '2rem',
                border: '2px solid #2e0d30',
                backgroundColor: filter === cat ? '#2e0d30' : 'white',
                color: filter === cat ? 'white' : '#2e0d30',
                fontWeight: 600,
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: '#2e0d30', fontWeight: 600 }}>Waking up the pandas...</p>
        ) : filtered.length === 0 ? (
          <div style={emptyStateStyle}>
            <p>No projects in this category yet. Be the first to submit!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {filtered.map((work) => (
              <div key={work.id} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={categoryBadgeStyle}>{work.category}</span>
                </div>
                
                <h2 style={{ color: '#2e0d30', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 600 }}>{work.title}</h2>
                <p style={{ color: '#3f3554', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>{work.description}</p>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  {/* NEW: View Work Button (Handles GitHub links, Figma, or Supabase File URLs) */}
                  {work.link && (
                    <a 
                      href={work.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={viewButtonStyle}
                    >
                      👀 View Work
                    </a>
                  )}
                  
                  <a href="/feedback" style={feedbackButtonStyle}>
                    Feedback →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

// Styling Objects
const sidebarStyle = { width: '260px', backgroundColor: 'white', borderRight: '4px solid #2e0d30', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', position: 'fixed', height: '100vh', zIndex: 100 };
const sidebarLinkStyle = { textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem', borderRadius: '1rem' };
const logoutButtonStyle = { marginTop: 'auto', padding: '1rem', backgroundColor: '#ff8bb1', color: '#2e0d30', borderRadius: '1.5rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', border: '3px solid #2e0d30', boxShadow: '4px 4px 0px #2e0d30' };

const cardStyle = { backgroundColor: 'white', padding: '2rem', borderRadius: '2rem', border: '3px solid #2e0d30', boxShadow: '6px 6px 0px #2e0d30', display: 'flex', flexDirection: 'column' };
const categoryBadgeStyle = { fontSize: '0.7rem', backgroundColor: '#59cd49', color: '#2e0d30', padding: '0.3rem 0.8rem', borderRadius: '1rem', fontWeight: 700, textTransform: 'uppercase' };

const viewButtonStyle = { flex: 1, textAlign: 'center', padding: '0.7rem', backgroundColor: '#f0f0f0', color: '#2e0d30', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', border: '2px solid #2e0d30' };
const feedbackButtonStyle = { flex: 1, textAlign: 'center', padding: '0.7rem', backgroundColor: '#2e0d30', color: 'white', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem' };

const emptyStateStyle = { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', border: '3px solid #2e0d30', textAlign: 'center', color: '#3f3554' };