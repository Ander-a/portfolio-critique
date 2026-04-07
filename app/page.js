export default function Home() {
  return (
    <main style={{ backgroundColor: '#59cd49', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      
      {/* Navigation */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', backgroundColor: 'rgba(255,255,255,0.9)', borderBottom: '4px solid #2e0d30' }}>
        <span style={{ fontWeight: 600, color: '#2e0d30', fontSize: '1.2rem' }}>🐼 Portfolio Critique</span>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="/browse" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600 }}>Browse</a>
          <a href="/submit" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600 }}>Submit</a>
          <a href="/feedbacks" style={{ textDecoration: 'none', color: '#3f3554', fontWeight: 600 }}>Community</a>
          <a href="/login" style={{ textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '2rem', backgroundColor: '#2e0d30', color: 'white' }}>Login</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h1 style={{ fontSize: '4rem', color: '#2e0d30', marginBottom: '1rem' }}>Share & Grow.</h1>
        <p style={{ fontSize: '1.2rem', color: '#3f3554', maxWidth: '600px', margin: '0 auto 2rem' }}>
          The funnest place to get honest feedback on your design, code, and writing.
        </p>
        <a href="/signup" style={{ padding: '1rem 2rem', backgroundColor: '#ffffff', color: '#2e0d30', borderRadius: '3rem', fontWeight: 600, textDecoration: 'none', fontSize: '1.1rem', border: '3px solid #2e0d30' }}>
          Join the Panda Pack 🐾
        </a>
      </section>
    </main>
  )
}