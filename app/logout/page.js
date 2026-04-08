'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../supabase'

export default function Logout() {
  const [loading, setLoading] = useState(false)
  
  // Panda Animation States
  const [handLStyle, setHandLStyle] = useState({ height: '2.81em', top: '8.4em', left: '7.5em', transform: 'rotate(0deg)' })
  const [handRStyle, setHandRStyle] = useState({ height: '2.81em', top: '8.4em', right: '7.5em', transform: 'rotate(0deg)' })

  // When the user clicks the Logout button
  async function handleLogout() {
    setLoading(true)
    
    // 1. Interactive Panda "Hides" its eyes
    setHandLStyle({ height: '6.56em', top: '3.87em', left: '11.75em', transform: 'rotate(-155deg)' })
    setHandRStyle({ height: '6.56em', top: '3.87em', right: '11.75em', transform: 'rotate(155deg)' })

    // 2. Delay slightly so the user sees the animation
    setTimeout(async () => {
      await supabase.auth.signOut()
      window.location.href = '/'
    }, 1500)
  }

  return (
    <div style={{ backgroundColor: '#59cd49', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      
      <div style={{ position: 'relative', height: '31.25em', width: '31.25em' }}>
        {/* Panda Face */}
        <div style={{ height: '7.5em', width: '8.4em', backgroundColor: '#ffffff', border: '0.18em solid #2e0d30', borderRadius: '7.5em 7.5em 5.62em 5.62em', position: 'absolute', top: '2em', margin: 'auto', left: 0, right: 0 }}>
          <div style={{ backgroundColor: '#3f3554', height: '2.18em', width: '2em', borderRadius: '2em', position: 'absolute', top: '2.18em', left: '1.37em', transform: 'rotate(-20deg)' }}>
            <div style={{ height: '0.6em', width: '0.6em', backgroundColor: '#ffffff', borderRadius: '50%', position: 'absolute', top: '0.6em', left: '0.6em' }} />
          </div>
          <div style={{ backgroundColor: '#3f3554', height: '2.18em', width: '2em', borderRadius: '2em', position: 'absolute', top: '2.18em', right: '1.37em', transform: 'rotate(20deg)' }}>
            <div style={{ height: '0.6em', width: '0.6em', backgroundColor: '#ffffff', borderRadius: '50%', position: 'absolute', top: '0.6em', right: '0.6em' }} />
          </div>
          <div style={{ height: '1em', width: '1em', backgroundColor: '#3f3554', position: 'absolute', top: '4.37em', margin: 'auto', left: 0, right: 0, borderRadius: '1.2em 0 0 0.25em', transform: 'rotate(45deg)' }} />
        </div>

        {/* Hands */}
        <div style={{ backgroundColor: '#3f3554', width: '2.5em', border: '0.18em solid #2e0d30', borderRadius: '0.6em 0.6em 2.18em 2.18em', transition: '1s all', position: 'absolute', zIndex: 10, ...handLStyle }} />
        <div style={{ backgroundColor: '#3f3554', width: '2.5em', border: '0.18em solid #2e0d30', borderRadius: '0.6em 0.6em 2.18em 2.18em', transition: '1s all', position: 'absolute', zIndex: 10, ...handRStyle }} />

        {/* Confirmation Card */}
        <div style={{ width: '23.75em', backgroundColor: '#ffffff', position: 'absolute', transform: 'translate(-50%, -50%)', top: 'calc(50% + 3.1em)', left: '50%', padding: '2em 3.1em', borderRadius: '1.5em', border: '4px solid #2e0d30', boxShadow: '8px 8px 0px #2e0d30' }}>
          <h2 style={{ color: '#2e0d30', textAlign: 'center', marginBottom: '1rem' }}>Done for now?</h2>
          <p style={{ textAlign: 'center', color: '#3f3554', fontSize: '0.9em', marginBottom: '2rem' }}>We'll keep your projects safe until you return to the pack.</p>
          
          <button onClick={handleLogout} disabled={loading}
            style={{ fontSize: '1em', padding: '0.8em 0', borderRadius: '2em', border: 'none', cursor: 'pointer', backgroundColor: '#ff8bb1', color: '#2e0d30', fontWeight: 600, width: '100%', border: '3px solid #2e0d30', boxShadow: '4px 4px 0px #2e0d30' }}>
            {loading ? 'Logging out...' : 'Confirm Logout 🐾'}
          </button>
          
          <a href="/browse" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', color: '#2e0d30', fontSize: '0.85em', fontWeight: 600, textDecoration: 'none' }}>
            Wait, take me back!
          </a>
        </div>
      </div>
    </div>
  )
}