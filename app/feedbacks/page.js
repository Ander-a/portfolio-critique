'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeedbacks() {
      const { data } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setFeedbacks(data)
      setLoading(false)
    }
    fetchFeedbacks()
  }, [])

  return (
    <main style={{ backgroundColor: '#59cd49', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      
      {/* Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', backgroundColor: 'white', borderBottom: '4px solid #2e0d30' }}>
        <a href="/" style={{ textDecoration: 'none', fontWeight: 600, color: '#2e0d30', fontSize: '1.1rem' }}>🐼 Portfolio Critique</a>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/browse" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600, fontSize: '0.9rem' }}>Browse</a>
          <a href="/submit" style={{ textDecoration: 'none', padding: '0.5rem 1.2rem', backgroundColor: '#2e0d30', color: 'white', borderRadius: '2rem', fontSize: '0.9rem' }}>Submit work</a>
        </div>
      </nav>

      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        <h1 style={{ color: '#2e0d30', fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Community Feedback</h1>
        <p style={{ color: '#3f3554', marginBottom: '2.5rem' }}>See what the pack is saying about recent projects.</p>

        {loading ? (
          <p style={{ color: '#2e0d30', fontWeight: 600 }}>Loading feedback...</p>
        ) : feedbacks.length === 0 ? (
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '3px solid #2e0d30', textAlign: 'center' }}>
            <p style={{ color: '#3f3554' }}>No feedback yet — be the first to give some!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {feedbacks.map((f) => (
              <div key={f.id} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '3px solid #2e0d30', boxShadow: '6px 6px 0px #2e0d30' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ fontWeight: 600, color: '#2e0d30', fontSize: '1rem' }}>👤 {f.author || 'Anonymous'}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <div key={n} style={{ 
                        width: '28px', 
                        height: '28px', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontWeight: 600,
                        border: '2px solid #2e0d30',
                        backgroundColor: n <= f.rating ? '#59cd49' : '#f0f0f0',
                        color: '#2e0d30'
                      }}>
                        {n}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.2rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#59cd49', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>🌟 What works</p>
                  <p style={{ fontSize: '0.95rem', color: '#3f3554', lineHeight: '1.6' }}>{f.what_works}</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ff8bb1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>🛠️ What to improve</p>
                  <p style={{ fontSize: '0.95rem', color: '#3f3554', lineHeight: '1.6' }}>{f.improve}</p>
                </div>

                <p style={{ fontSize: '0.75rem', color: '#a0a0a0', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                  Posted on {new Date(f.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}