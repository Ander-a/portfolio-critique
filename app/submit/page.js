'use client'
import { useState } from 'react'
import { supabase } from '../../supabase'

export default function Submit() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Design')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const { error } = await supabase
      .from('works')
      .insert([{ title, category, description, link, author: 'Anonymous' }])
    if (!error) setSuccess(true)
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <a href="/" className="font-semibold text-gray-900">Portfolio Critique</a>
        <a href="/browse" className="text-sm text-gray-500 hover:text-gray-900">Browse work</a>
      </nav>
      <section className="max-w-xl mx-auto px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Submit your work</h1>
        <p className="text-sm text-gray-500 mb-8">Share what you've made and get honest feedback.</p>
        {success ? (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-gray-900 mb-2">Work submitted!</p>
            <p className="text-sm text-gray-500 mb-6">Your work is now live for feedback.</p>
            <a href="/browse" className="px-6 py-3 bg-black text-white rounded-lg text-sm">Browse work</a>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Mobile app redesign concept"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 bg-white">
                <option>Design</option>
                <option>Writing</option>
                <option>Code</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)}
                placeholder="What is this work about? What kind of feedback are you looking for?"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link to your work</label>
              <input type="url" value={link} onChange={e => setLink(e.target.value)}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400" />
            </div>
            <button onClick={handleSubmit} disabled={loading}
              className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit for critique'}
            </button>
          </div>
        )}
      </section>
    </main>
  )
}