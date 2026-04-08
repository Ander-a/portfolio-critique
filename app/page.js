'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Home() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for an active session on load
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    checkUser()

    // Listen for login/logout changes to swap the UI
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#59cd49', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      
      {/* SIDEBAR - Only visible when the user is logged in */}
      {user && (
        <aside style={sidebarContainerStyle}>
          <h2 style={{ color: '#2e0d30', marginBottom: '3rem', fontSize: '1.2rem' }}>🐼 Dashboard</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
            <a href="/browse" style={sidebarLinkStyle}>🔍 Browse Work</a>
            <a href="/submit" style={sidebarLinkStyle}>📤 Submit Work</a>
            <a href="/feedbacks" style={sidebarLinkStyle}>💬 Community</a>
          </nav>
          
          {/* Direct Link to the Interactive Logout Page */}
          <a href="/logout" style={logoutSidebarButtonStyle}>
            Logout 🐾
          </a>
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
        {/* Public Header - Only visible to guests */}
        {!user && (
          <header style={landingHeaderStyle}>
            <span style={{ fontWeight: 700, color: '#2e0d30', fontSize: '1.5rem' }}>Panda Critique</span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="/login" style={{ color: '#2e0d30', textDecoration: 'none', fontWeight: 600 }}>Login</a>
              <a href="/signup" style={signupButtonStyle}>Join Pack</a>
            </div>
          </header>
        )}

        {/* Dynamic Content: Changes based on Auth State */}
        <div style={{ textAlign: 'center', maxWidth: '700px', marginTop: user ? '5rem' : '2rem' }}>
          <h1 style={{ fontSize: '3.5rem', color: '#2e0d30', marginBottom: '1.5rem', fontWeight: 600 }}>
            {user ? `Welcome back, ${user.user_metadata?.name || 'Panda'}!` : 'Share your work. Get honest feedback.'}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#3f3554', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            {user 
              ? 'Use the sidebar on the left to navigate through the community and manage your submissions.' 
              : 'A dedicated platform for designers, developers, and writers to critique each other’s work and grow together in a supportive community.'}
          </p>
          
          {!user && (
            <a href="/signup" style={ctaButtonStyle}>
              Start for Free 🐾
            </a>
          )}
        </div>
      </main>
    </div>
  )
}

// Sidebar Styles
const sidebarContainerStyle = {
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
  transition: '0.2s'
};

const logoutSidebarButtonStyle = {
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

// Public Landing Styles
const landingHeaderStyle = {
  width: '100%', 
  maxWidth: '900px', 
  display: 'flex', 
  justifyContent: 'space-between', 
  alignItems: 'center', 
  marginBottom: '5rem'
};

const signupButtonStyle = {
  backgroundColor: 'white', 
  padding: '0.6rem 1.5rem', 
  borderRadius: '2rem', 
  border: '3px solid #2e0d30', 
  textDecoration: 'none', 
  color: '#2e0d30', 
  fontWeight: 600
};

const ctaButtonStyle = {
  padding: '1.2rem 2.5rem', 
  backgroundColor: 'white', 
  color: '#2e0d30', 
  borderRadius: '3rem', 
  fontWeight: 700, 
  textDecoration: 'none', 
  border: '4px solid #2e0d30', 
  boxShadow: '6px 6px 0px #2e0d30'
};