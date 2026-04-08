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

  // Styles defined inside the file to prevent the ReferenceError
  const sidebarStyle = { 
    width: '260px', 
    backgroundColor: 'white', 
    borderRight: '4px solid #2e0d30', 
    display: 'flex', 
    flexDirection: 'column', 
    padding: '2rem 1.5rem', 
    position: 'fixed', 
    height: '100vh', 
    zIndex: 100 
  };

  const sidebarLinkStyle = { 
    textDecoration: 'none', 
    color: '#3f3554', 
    fontWeight: 600, 
    padding: '1rem', 
    borderRadius: '1rem',
    display: 'block'
  };

  const logoutButtonStyle = { 
    marginTop: 'auto', 
    padding: '1rem', 
    backgroundColor: '#ff8bb1', 
    color: '#2e0d30', 
    borderRadius: '1.5rem', 
    textAlign: 'center', 
    fontWeight: 600, 
    textDecoration: 'none', 
    border: '3px solid #2e0d30', 
    boxShadow: '4px 4px 0px #2e0d30' 
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#59cd49', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      
      {/* Sidebar Dashboard Menu */}
      <aside style={sidebarStyle}>
        <h2 style={{ color: '#2e0d30', marginBottom: '3rem', fontSize: '1.2rem' }}>🐼 Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <a href="/browse" style={sidebarLinkStyle}>🔍 Browse Work</a>
          <a href="/submit" style={sidebarLinkStyle}>📤 Submit Work</a>
          <a href="/feedbacks" style={{ ...sidebarLinkStyle, backgroundColor: '#f0f0f0', border: '2px solid #2e0d30', color: '#2e0d30', fontWeight: 700 }}>💬 Community</a>
        </nav>
        <a href="/logout" style={logoutButtonStyle}>Logout 🐾</a>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '3rem' }}>
        <h1 style={{ color: '#2e0d30', marginBottom: '1rem', fontSize: '2rem', fontWeight: 600 }}>Panda Peer Reviews</h1>
        <p style={{ color: '#3f3554', marginBottom: '2.5rem' }}>Check out what the pack is saying.</p>
        
        {loading ? (
          <p style={{ color: '#2e0d30', fontWeight: 600 }}>Loading feedback...</p>
        ) : (
          <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {feedbacks.map(f => (
              <div key={f.id} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '3px solid #2e0d30', boxShadow: '6px 6px 0px #2e0d30' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <p style={{ fontWeight: 700, color: '#59cd49' }}>Rating: {f.rating}/5</p>
                    <p style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>{new Date(f.created_at).toLocaleDateString()}</p>
                </div>
                <p style={{ color: '#2e0d30', fontWeight: 600, marginBottom: '0.5rem' }}>🌟 What works:</p>
                <p style={{ color: '#3f3554', marginBottom: '1rem', lineHeight: '1.5' }}>{f.what_works}</p>
                <p style={{ color: '#2e0d30', fontWeight: 600, marginBottom: '0.5rem' }}>🛠️ To improve:</p>
                <p style={{ color: '#3f3554', lineHeight: '1.5' }}>{f.improve}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}