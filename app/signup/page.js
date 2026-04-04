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
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create account</h1>
        <p className="text-sm text-gray-500 mb-8">Join the community. It's free.</p>

        {success ? (
          <div className="text-center py-8">
            <p className="text-lg font-medium text-gray-900 mb-2">Check your email!</p>
            <p className="text-sm text-gray-500">We sent you a confirmation link to verify your account.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Your name" value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400" />
            <input type="email" placeholder="Email address" value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400" />
            <input type="password" placeholder="Password" value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400" />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button onClick={handleSignup} disabled={loading}
              className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        )}

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account? <a href="/login" className="text-gray-900 font-medium">Log in</a>
        </p>
      </div>
    </main>
  )
}