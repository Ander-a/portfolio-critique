'use client'
import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Submit() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Design')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!title || !description) {
      alert("Please fill in the fields!")
      return
    }
    setLoading(true)
    const { error } = await supabase.from('works').insert([{ title, category, description, author: 'Panda Member' }])
    if (!error) window.location.href = '/browse'
    else alert(error.message)
    setLoading(false)
  }

  return (
    <main style={{ backgroundColor: '#59cd49', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif', padding: '2rem' }}>
      <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '500px', padding: '2.5rem', borderRadius: '2rem', border: '4px solid #2e0d30', boxShadow: '8px 8px 0px #2e0d30', marginTop: '2rem' }}>
        <h1 style={{ color: '#2e0d30', textAlign: 'center', marginBottom: '1.5rem' }}>Submit Work 🐾</h1>
        
        <label style={{ fontWeight: 600, color: '#2e0d30', display: 'block', marginBottom: '0.3rem' }}>Project Title</label>
        <input 
          onChange={e => setTitle(e.target.value)} 
          placeholder="e.g. My Awesome UI"
          style={{ width: '100%', padding: '0.8rem', color: '#2e0d30', border: 'none', borderBottom: '2px solid #2e0d30', outline: 'none', marginBottom: '1.5rem', fontSize: '1rem' }} 
        />
        
        <label style={{ fontWeight: 600, color: '#2e0d30', display: 'block', marginBottom: '0.3rem' }}>Category</label>
        <select 
          onChange={e => setCategory(e.target.value)} 
          style={{ width: '100%', padding: '0.8rem', color: '#2e0d30', borderRadius: '0.5rem', border: '2px solid #2e0d30', marginBottom: '1.5rem', backgroundColor: '#f9f9f9' }}
        >
          <option>Design</option>
          <option>Code</option>
          <option>Writing</option>
        </select>

        <label style={{ fontWeight: 600, color: '#2e0d30', display: 'block', marginBottom: '0.3rem' }}>Description</label>
        <textarea 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Tell the pack about your work..."
          style={{ width: '100%', padding: '0.8rem', color: '#2e0d30', height: '120px', borderRadius: '0.5rem', border: '2px solid #2e0d30', outline: 'none', marginBottom: '2rem', fontSize: '1rem', resize: 'none' }} 
        />
        
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          style={{ width: '100%', padding: '1.2rem', backgroundColor: '#59cd49', color: '#2e0d30', fontWeight: 800, borderRadius: '3rem', border: '4px solid #2e0d30', cursor: 'pointer', fontSize: '1.1rem', transition: '0.2s' }}
        >
          {loading ? 'SENDING...' : 'POST TO FEED'}
        </button>
      </div>
    </main>
  )
}