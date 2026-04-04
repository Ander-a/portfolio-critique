'use client'
import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else window.location.href = '/browse'
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-8">Log in to your account.</p>

        <div className="flex flex-col gap-4">
          <input type="email" placeholder="Email address" value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400" />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button onClick={handleLogin} disabled={loading}
            className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        <p className="text-sm text-gray-400 text-center mt-6">
          Don't have an account? <a href="/signup" className="text-gray-900 font-medium">Sign up</a>
        </p>
      </div>
    </main>
  )
}