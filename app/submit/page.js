'use client'
import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Submit() {
  const [title, setTitle] = useState(''); const [category, setCategory] = useState('Design')
  const [description, setDescription] = useState(''); const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const { error } = await supabase.from('works').insert([{ title, category, description, author: 'Panda User' }])
    if (!error) window.location.href = '/browse'
    setLoading(false)
  }

  return (
    <main style={{ backgroundColor: '#59cd49', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ backgroundColor: 'white', width: '90%', maxWidth: '500px', padding: '3rem', borderRadius: '2rem', border: '4px solid #2e0d30', marginTop: '4rem', boxShadow: '8px 8px 0px #2e0d30' }}>
        <h1 style={{ color: '#2e0d30', textAlign: 'center' }}>Submit Work 🐾</h1>
        <div style={{ marginTop: '2rem' }}>
          <label style={{ fontWeight: 600, display: 'block' }}>Title</label>
          <input onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '0.8rem', border: 'none', borderBottom: '2px solid #3f3554', outline: 'none', marginBottom: '1.5rem' }} />
          
          <label style={{ fontWeight: 600, display: 'block' }}>Category</label>
          <select onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '1.5rem' }}>
            <option>Design</option><option>Code</option><option>Writing</option>
          </select>

          <label style={{ fontWeight: 600, display: 'block' }}>Description</label>
          <textarea onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '0.8rem', height: '100px', marginBottom: '1.5rem' }} />
          
          <button onClick={handleSubmit} style={{ width: '100%', padding: '1rem', backgroundColor: '#59cd49', color: '#2e0d30', fontWeight: 700, borderRadius: '2rem', border: '3px solid #2e0d30', cursor: 'pointer' }}>
            {loading ? 'POSTING...' : 'POST PROJECT'}
          </button>
        </div>
      </div>
    </main>
  )
}