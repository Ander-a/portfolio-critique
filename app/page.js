'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#59cd49', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      
      {/* SIDEBAR - Only visible when logged in */}
      {user && (
        <aside style={sidebarContainerStyle}>
          <h2 style={{ color: '#2e0d30', marginBottom: '3rem', fontSize: '1.2rem' }}>🐼 Dashboard</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <a href="/browse" style={sidebarLinkStyle}>🔍 Browse Work</a>
            <a href="/submit" style={sidebarLinkStyle}>📤 Submit Work</a>
            <a href="/feedbacks" style={sidebarLinkStyle}>💬 Community</a>
          </nav>
          <a href="/logout" style={logoutButtonStyle}>Logout 🐾</a>
        </aside>
      )}

      {/* MAIN CONTENT AREA */}
      <main style={{ 
        flex: 1, 
        marginLeft: user ? '260px' : '0', 
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Public Header - Only visible when logged out */}
        {!user && (
          <header style={landingHeaderStyle}>
            <span style={{ fontWeight: 700, color: '#2e0d30', fontSize: '1.5rem' }}>Panda Critique</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="/login" style={{ color: '#2e0d30', textDecoration: 'none', fontWeight: 600 }}>Login</a>
              <a href="/signup" style={signupButtonStyle}>Join</a>
            </div>
          </header>
        )}

        {/* Dynamic Content */}
        <div style={{ textAlign: 'center', maxWidth: '700px', marginTop: user ? '5rem' : '2rem' }}>
          <h1 style={{ fontSize: '3.5rem', color: '#2e0d30', marginBottom: '1.5rem', fontWeight: 600 }}>
            {user ? `Welcome, ${user.user_metadata?.name || 'Panda'}!` : 'Share & Grow.'}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#3f3554', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            {user 
              ? 'Your personalized dashboard is ready. Use the sidebar to explore new projects or submit your latest masterpiece for feedback.' 
              : 'A dedicated space for creators to get high-quality feedback. Upload your project, join the community, and sharpen your craft.'}
          </p>
          {!user && (
            <a href="/signup" style={ctaButtonStyle}>Start Now 🐾</a>
          )}
        </div>
      </main>
    </div>
  )
}

// Sidebar Styles
const sidebarContainerStyle = {
  width: '260px', backgroundColor: 'white', borderRight: '4px solid #2e0d30', 
  display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem',
  position: 'fixed', height: '100vh', zIndex: 100
};

const sidebarLinkStyle = {
  textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem',
  borderRadius: '1rem', transition: '0.2s', border: '2px solid transparent'
};

const logoutButtonStyle = {
  marginTop: 'auto', padding: '1rem', backgroundColor: '#ff8bb1', color: '#2e0d30', 
  borderRadius: '1.5rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', 
  border: '3px solid #2e0d30', boxShadow: '4px 4px 0px #2e0d30'
};

// Landing Page Styles
const landingHeaderStyle = {
  width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', 
  alignItems: 'center', marginBottom: '5rem'
};

const signupButtonStyle = {
  backgroundColor: 'white', padding: '0.5rem 1.5rem', borderRadius: '2rem', 
  border: '3px solid #2e0d30', textDecoration: 'none', color: '#2e0d30', fontWeight: 600
};

const ctaButtonStyle = {
  padding: '1.2rem 2.5rem', backgroundColor: 'white', color: '#2e0d30', 
  borderRadius: '3rem', fontWeight: 700, textDecoration: 'none', 
  border: '4px solid #2e0d30', boxShadow: '6px 6px 0px #2e0d30'
};