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
      <aside style={sidebarStyle}>
        <h2 style={{ color: '#2e0d30', marginBottom: '3rem' }}>🐼 Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <a href="/browse" style={sidebarLinkStyle}>🔍 Browse Work</a>
          <a href="/submit" style={sidebarLinkStyle}>📤 Submit Work</a>
          <a href="/feedbacks" style={{ ...sidebarLinkStyle, backgroundColor: '#f0f0f0', border: '2px solid #2e0d30', color: '#2e0d30' }}>💬 Community</a>
        </nav>
        <a href="/logout" style={logoutButtonStyle}>Logout 🐾</a>
      </aside>

      <main style={{ marginLeft: '260px', flex: 1, padding: '3rem' }}>
        <h1 style={{ color: '#2e0d30', marginBottom: '2rem' }}>Panda Peer Reviews</h1>
        <div style={{ maxWidth: '750px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {feedbacks.map(f => (
            <div key={f.id} style={feedbackCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, color: '#59cd49' }}>Rating: {f.rating}/5</span>
                {/* PROFESSIONAL ADDITION: Reviewer Tag */}
                <span style={{ fontSize: '0.8rem', color: '#2e0d30', fontWeight: 600 }}>🐾 Reviewed by: {f.reviewer_name || 'Guest Panda'}</span>
              </div>
              
              <p style={labelStyle}>🌟 What works:</p>
              <p style={textStyle}>{f.what_works}</p>
              
              <p style={labelStyle}>🛠️ Areas to improve:</p>
              <p style={textStyle}>{f.improve}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

const sidebarStyle = { width: '260px', backgroundColor: 'white', borderRight: '4px solid #2e0d30', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', position: 'fixed', height: '100vh', zIndex: 100 };
const sidebarLinkStyle = { textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem', borderRadius: '1rem' };
const logoutButtonStyle = { marginTop: 'auto', padding: '1rem', backgroundColor: '#ff8bb1', color: '#2e0d30', borderRadius: '1.5rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', border: '3px solid #2e0d30' };
const feedbackCardStyle = { backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '3px solid #2e0d30', boxShadow: '6px 6px 0px #2e0d30' };
const labelStyle = { color: '#2e0d30', fontWeight: 700, marginBottom: '0.3rem', fontSize: '0.9rem' };
const textStyle = { color: '#3f3554', marginBottom: '1rem', lineHeight: '1.5' };