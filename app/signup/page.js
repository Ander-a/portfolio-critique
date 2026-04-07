'use client'
import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Panda Animation States
  const [eyeStyle, setEyeStyle] = useState({ left: '0.6em', top: '0.6em' })
  const [eyeRStyle, setEyeRStyle] = useState({ right: '0.6em', top: '0.6em' })
  const [handLStyle, setHandLStyle] = useState({ height: '2.81em', top: '8.4em', left: '7.5em', transform: 'rotate(0deg)' })
  const [handRStyle, setHandRStyle] = useState({ height: '2.81em', top: '8.4em', right: '7.5em', transform: 'rotate(0deg)' })

  function normalEyes() {
    setEyeStyle({ left: '0.6em', top: '0.6em' })
    setEyeRStyle({ right: '0.6em', top: '0.6em' })
  }

  function normalHands() {
    setHandLStyle({ height: '2.81em', top: '8.4em', left: '7.5em', transform: 'rotate(0deg)' })
    setHandRStyle({ height: '2.81em', top: '8.4em', right: '7.5em', transform: 'rotate(0deg)' })
  }

  function focusInput() {
    setEyeStyle({ left: '0.75em', top: '1.12em' })
    setEyeRStyle({ right: '0.75em', top: '1.12em' })
    normalHands()
  }

  function focusPassword() {
    setHandLStyle({ height: '6.56em', top: '3.87em', left: '11.75em', transform: 'rotate(-155deg)' })
    setHandRStyle({ height: '6.56em', top: '3.87em', right: '11.75em', transform: 'rotate(155deg)' })
    normalEyes()
  }

  async function handleSignup() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } }
    })
    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#59cd49', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      <div style={{ position: 'relative', height: '31.25em', width: '31.25em' }}>
        {/* Ears */}
        <div style={{ backgroundColor: '#3f3554', height: '2.5em', width: '2.81em', border: '0.18em solid #2e0d30', borderRadius: '2.5em 2.5em 0 0', top: '1.75em', position: 'absolute', transform: 'rotate(-38deg)', left: '10.75em' }} />
        <div style={{ backgroundColor: '#3f3554', height: '2.5em', width: '2.81em', border: '0.18em solid #2e0d30', borderRadius: '2.5em 2.5em 0 0', top: '1.75em', position: 'absolute', transform: 'rotate(38deg)', right: '10.75em' }} />
        
        {/* Panda face */}
        <div style={{ height: '7.5em', width: '8.4em', backgroundColor: '#ffffff', border: '0.18em solid #2e0d30', borderRadius: '7.5em 7.5em 5.62em 5.62em', position: 'absolute', top: '2em', margin: 'auto', left: 0, right: 0 }}>
          <div style={{ backgroundColor: '#ff8bb1', height: '1em', width: '1.37em', borderRadius: '50%', position: 'absolute', top: '4em', transform: 'rotate(25deg)', left: '1em' }} />
          <div style={{ backgroundColor: '#ff8bb1', height: '1em', width: '1.37em', borderRadius: '50%', position: 'absolute', top: '4em', transform: 'rotate(-25deg)', right: '1em' }} />
          <div style={{ backgroundColor: '#3f3554', height: '2.18em', width: '2em', borderRadius: '2em', position: 'absolute', top: '2.18em', left: '1.37em', transform: 'rotate(-20deg)' }}>
            <div style={{ height: '0.6em', width: '0.6em', backgroundColor: '#ffffff', borderRadius: '50%', position: 'absolute', transition: '1s all', transform: 'rotate(20deg)', ...eyeStyle }} />
          </div>
          <div style={{ backgroundColor: '#3f3554', height: '2.18em', width: '2em', borderRadius: '2em', position: 'absolute', top: '2.18em', right: '1.37em', transform: 'rotate(20deg)' }}>
            <div style={{ height: '0.6em', width: '0.6em', backgroundColor: '#ffffff', borderRadius: '50%', position: 'absolute', transition: '1s all', transform: 'rotate(-20deg)', ...eyeRStyle }} />
          </div>
          <div style={{ height: '1em', width: '1em', backgroundColor: '#3f3554', position: 'absolute', top: '4.37em', margin: 'auto', left: 0, right: 0, borderRadius: '1.2em 0 0 0.25em', transform: 'rotate(45deg)' }} />
        </div>

        {/* Hands */}
        <div style={{ backgroundColor: '#3f3554', width: '2.5em', border: '0.18em solid #2e0d30', borderRadius: '0.6em 0.6em 2.18em 2.18em', transition: '1s all', position: 'absolute', ...handLStyle }} />
        <div style={{ backgroundColor: '#3f3554', width: '2.5em', border: '0.18em solid #2e0d30', borderRadius: '0.6em 0.6em 2.18em 2.18em', transition: '1s all', position: 'absolute', ...handRStyle }} />

        {/* Form */}
        <div style={{ width: '23.75em', backgroundColor: '#ffffff', position: 'absolute', transform: 'translate(-50%, -50%)', top: 'calc(50% + 3.1em)', left: '50%', padding: '2em 3.1em', borderRadius: '0.5em' }}>
          {success ? (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#2e0d30' }}>Check your email! 🐼</h2>
              <p style={{ color: '#3f3554', fontSize: '0.85em' }}>Confirm your account to join the pack.</p>
              <a href="/login" style={{ color: '#59cd49', fontWeight: 600, display: 'block', marginTop: '1em' }}>Go to Login</a>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '0.9em' }}>
                <label style={{ display: 'block', marginBottom: '0.2em', fontWeight: 600, color: '#2e0d30' }}>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} onFocus={focusInput} placeholder="Your name..."
                  style={{ fontSize: '0.95em', color: '#2e0d30', padding: '0.3em', border: 'none', borderBottom: '0.12em solid #3f3554', outline: 'none', width: '100%' }} />
              </div>
              <div style={{ marginBottom: '0.9em' }}>
                <label style={{ display: 'block', marginBottom: '0.2em', fontWeight: 600, color: '#2e0d30' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={focusInput} placeholder="Email here..."
                  style={{ fontSize: '0.95em', color: '#2e0d30', padding: '0.3em', border: 'none', borderBottom: '0.12em solid #3f3554', outline: 'none', width: '100%' }} />
              </div>
              <div style={{ marginBottom: '0.9em' }}>
                <label style={{ display: 'block', marginBottom: '0.2em', fontWeight: 600, color: '#2e0d30' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} onFocus={focusPassword} placeholder="Password here..."
                  style={{ fontSize: '0.95em', color: '#2e0d30', padding: '0.3em', border: 'none', borderBottom: '0.12em solid #3f3554', outline: 'none', width: '100%' }} />
              </div>
              {error && <p style={{ color: 'red', fontSize: '0.75em' }}>{error}</p>}
              <button onClick={handleSignup} disabled={loading}
                style={{ fontSize: '0.95em', padding: '0.8em 0', borderRadius: '2em', border: 'none', cursor: 'pointer', backgroundColor: '#59cd49', color: '#2e0d30', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.15em', marginTop: '0.8em', width: '100%' }}>
                {loading ? 'Joining...' : 'Sign Up'}
              </button>
            </>
          )}
          <p style={{ textAlign: 'center', marginTop: '1em', fontSize: '0.85em', color: '#3f3554' }}>
            Already a panda? <a href="/login" style={{ color: '#2e0d30', fontWeight: 600 }}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  )
}