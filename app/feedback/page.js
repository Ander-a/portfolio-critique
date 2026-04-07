'use client'
import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Feedback() {
  const [whatWorks, setWhatWorks] = useState('')
  const [improve, setImprove] = useState('')
  const [rating, setRating] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!whatWorks || !improve || !rating) {
      alert('Please fill in all fields and select a rating!')
      return
    }
    setLoading(true)
    const { error } = await supabase
      .from('feedback')
      .insert([{ what_works: whatWorks, improve, rating, author: 'Anonymous Panda' }])
    if (!error) setSubmitted(true)
    setLoading(false)
  }

  return (
    <main style={{ backgroundColor: '#59cd49', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      
      {/* Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', backgroundColor: 'white', borderBottom: '4px solid #2e0d30' }}>
        <a href="/" style={{ textDecoration: 'none', fontWeight: 600, color: '#2e0d30' }}>🐼 Home</a>
        <a href="/browse" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600, fontSize: '0.9rem' }}>Back to Browse</a>
      </nav>

      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
        
        {/* The Work Being Reviewed Card */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '3px solid #2e0d30', marginBottom: '2rem', boxShadow: '5px 5px 0px #2e0d30' }}>
          <span style={{ fontSize: '0.7rem', backgroundColor: '#f0f0f0', color: '#3f3554', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontWeight: 700 }}>REVIEWING</span>
          <h1 style={{ color: '#2e0d30', fontSize: '1.5rem', marginTop: '0.5rem' }}>Mobile banking app redesign</h1>
          <p style={{ color: '#3f3554', fontSize: '0.9rem', marginBottom: '1rem' }}>by Alex K.</p>
          <p style={{ color: '#3f3554', fontSize: '0.9rem', lineHeight: '1.5' }}>
            I redesigned the onboarding flow for a mobile banking app focusing on simplicity and trust.
          </p>
        </div>

        {/* The Feedback Form Card */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '2rem', border: '4px solid #2e0d30', boxShadow: '8px 8px 0px #2e0d30' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h2 style={{ color: '#2e0d30' }}>Feedback Sent! 🐾</h2>
              <p style={{ color: '#3f3554', marginBottom: '2rem' }}>The creator will see your tips in the community feed.</p>
              <a href="/browse" style={{ display: 'inline-block', padding: '0.8rem 1.5rem', backgroundColor: '#59cd49', color: '#2e0d30', borderRadius: '2rem', fontWeight: 700, textDecoration: 'none', border: '3px solid #2e0d30' }}>
                Browse more work
              </a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ color: '#2e0d30', textAlign: 'center' }}>Give Feedback</h2>

              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#2e0d30', marginBottom: '0.5rem' }}>What works well?</label>
                <textarea rows={3} value={whatWorks} onChange={e => setWhatWorks(e.target.value)}
                  placeholder="The colors are great..."
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '1rem', border: '2px solid #3f3554', outline: 'none', fontSize: '0.9rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#2e0d30', marginBottom: '0.5rem' }}>What to improve?</label>
                <textarea rows={3} value={improve} onChange={e => setImprove(e.target.value)}
                  placeholder="Maybe change the font..."
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '1rem', border: '2px solid #3f3554', outline: 'none', fontSize: '0.9rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#2e0d30', marginBottom: '0.8rem' }}>Overall Rating</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setRating(n)}
                      style={{ 
                        width: '45px', 
                        height: '45px', 
                        borderRadius: '12px', 
                        border: '3px solid #2e0d30', 
                        fontWeight: 700, 
                        cursor: 'pointer',
                        transition: '0.2s',
                        backgroundColor: rating === n ? '#59cd49' : 'white',
                        color: '#2e0d30'
                      }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  backgroundColor: '#2e0d30', 
                  color: 'white', 
                  borderRadius: '2rem', 
                  fontWeight: 600, 
                  border: 'none', 
                  cursor: 'pointer',
                  opacity: loading ? 0.7 : 1
                }}>
                {loading ? 'Sending...' : 'Submit Feedback 🐾'}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}