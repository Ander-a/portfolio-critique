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

    // Listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <main style={{ backgroundColor: '#59cd49', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', backgroundColor: 'white', borderBottom: '4px solid #2e0d30', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#2e0d30', fontSize: '1.2rem' }}>
          🏠 <span>Panda Critique</span>
        </a>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/browse" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600 }}>Browse</a>
          
          {user ? (
            <>
              <a href="/submit" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600 }}>Submit</a>
              <a href="/feedbacks" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600 }}>Community</a>
              <a href="/logout" style={{ textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '2rem', backgroundColor: '#ff8bb1', color: '#2e0d30', fontWeight: 600, border: '2px solid #2e0d30' }}>Logout 🐾</a>
            </>
          ) : (
            <>
              <a href="/login" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600 }}>Login</a>
              <a href="/signup" style={{ textDecoration: 'none', padding: '0.5rem 1.2rem', borderRadius: '2rem', backgroundColor: '#ffffff', color: '#2e0d30', fontWeight: 600, border: '2px solid #2e0d30' }}>Join Pack</a>
            </>
          )}
        </div>
      </nav>

      <section style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h1 style={{ fontSize: '4rem', color: '#2e0d30', marginBottom: '1rem' }}>Share & Grow.</h1>
        <p style={{ fontSize: '1.2rem', color: '#3f3554', maxWidth: '600px', margin: '0 auto 2rem' }}>
          The funnest place to get honest feedback on your projects.
        </p>
        {!user && (
          <a href="/signup" style={{ padding: '1rem 2rem', backgroundColor: '#ffffff', color: '#2e0d30', borderRadius: '3rem', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem', border: '3px solid #2e0d30', boxShadow: '4px 4px 0px #2e0d30' }}>
            Get Started 🐾
          </a>
        )}
      </section>
    </main>
  )
}