'use client'
import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Submit() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Design')
  const [description, setDescription] = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!title || !description) {
      alert("Please fill in the title and description!")
      return
    }
    
    setLoading(true)
    let fileUrl = ''

    // 1. Upload file if it exists
    if (file) {
      const fileName = `${Math.random()}-${file.name}`
      const { data, error: uploadError } = await supabase.storage
        .from('work-files')
        .upload(fileName, file)
      
      if (uploadError) {
        alert("File upload failed!")
        setLoading(false)
        return
      }
      fileUrl = supabase.storage.from('work-files').getPublicUrl(fileName).data.publicUrl
    }

    // 2. Save to Database
    const { error } = await supabase.from('works').insert([{ 
      title, 
      category, 
      description, 
      link: externalLink || fileUrl, // Saves the GitHub link OR the uploaded file link
      author: 'Panda Member' 
    }])

    if (!error) window.location.href = '/browse'
    else alert(error.message)
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#59cd49', fontFamily: 'Poppins, sans-serif' }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h2 style={{ color: '#2e0d30', marginBottom: '3rem' }}>🐼 Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <a href="/browse" style={sidebarLinkStyle}>🔍 Browse</a>
          <a href="/submit" style={{ ...sidebarLinkStyle, backgroundColor: '#f0f0f0', border: '2px solid #2e0d30' }}>📤 Submit</a>
          <a href="/feedbacks" style={sidebarLinkStyle}>💬 Community</a>
        </nav>
        <a href="/logout" style={logoutButtonStyle}>Logout 🐾</a>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '3rem', display: 'flex', justifyContent: 'center' }}>
        <div style={formCardStyle}>
          <h1 style={{ color: '#2e0d30', textAlign: 'center', marginBottom: '1.5rem' }}>Submit Work 🐾</h1>
          
          <label style={labelStyle}>Category</label>
          <select onChange={e => setCategory(e.target.value)} style={inputStyle}>
            <option value="Design">🎨 Design (Figma/Images)</option>
            <option value="Code">💻 Code (GitHub/Files)</option>
            <option value="Writing">✍️ Writing (PDF/Word)</option>
          </select>

          <label style={labelStyle}>Title</label>
          <input onChange={e => setTitle(e.target.value)} placeholder="Project Name" style={inputStyle} />
          
          <label style={labelStyle}>External Link (GitHub / Figma / Portfolio)</label>
          <input onChange={e => setExternalLink(e.target.value)} placeholder="https://..." style={inputStyle} />

          <p style={{ textAlign: 'center', margin: '10px 0', fontWeight: 600, color: '#3f3554' }}>— OR —</p>

          <label style={labelStyle}>Upload Document (PDF/Word/Code file)</label>
          <input type="file" onChange={e => setFile(e.target.files[0])} style={fileInputStyle} />

          <label style={labelStyle}>Description</label>
          <textarea onChange={e => setDescription(e.target.value)} placeholder="What should people look for?" style={textareaStyle} />
          
          <button onClick={handleSubmit} disabled={loading} style={submitButtonStyle}>
            {loading ? 'UPLOADING...' : 'POST TO PACK'}
          </button>
        </div>
      </main>
    </div>
  )
}

// Styling (Swap only)
const sidebarStyle = { width: '260px', backgroundColor: 'white', borderRight: '4px solid #2e0d30', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', position: 'fixed', height: '100vh', zIndex: 100 };
const sidebarLinkStyle = { textDecoration: 'none', color: '#3f3554', fontWeight: 600, padding: '1rem', borderRadius: '1rem' };
const logoutButtonStyle = { marginTop: 'auto', padding: '1rem', backgroundColor: '#ff8bb1', color: '#2e0d30', borderRadius: '1.5rem', textAlign: 'center', fontWeight: 600, textDecoration: 'none', border: '3px solid #2e0d30' };
const formCardStyle = { backgroundColor: 'white', width: '100%', maxWidth: '500px', padding: '2.5rem', borderRadius: '2rem', border: '4px solid #2e0d30', boxShadow: '8px 8px 0px #2e0d30' };
const labelStyle = { fontWeight: 600, color: '#2e0d30', display: 'block', marginBottom: '0.3rem', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '0.8rem', color: '#2e0d30', border: '2px solid #2e0d30', borderRadius: '0.5rem', outline: 'none', marginBottom: '1.2rem' };
const fileInputStyle = { width: '100%', padding: '0.5rem', marginBottom: '1.2rem', color: '#3f3554' };
const textareaStyle = { width: '100%', padding: '0.8rem', color: '#2e0d30', height: '100px', borderRadius: '0.5rem', border: '2px solid #2e0d30', marginBottom: '1.5rem', resize: 'none' };
const submitButtonStyle = { width: '100%', padding: '1.2rem', backgroundColor: '#59cd49', color: '#2e0d30', fontWeight: 800, borderRadius: '3rem', border: '4px solid #2e0d30', cursor: 'pointer' };