export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <span className="font-semibold text-gray-900">Portfolio Critique</span>
        <div className="flex gap-3 items-center">
          <a href="/browse" className="text-sm text-gray-500 hover:text-gray-900">Browse</a>
          <a href="/submit" className="text-sm text-gray-500 hover:text-gray-900">Submit work</a>
          <a href="/feedbacks" className="text-sm text-gray-500 hover:text-gray-900">Feedbacks</a>
          <a href="/login" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Log in</a>
          <a href="/signup" className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800">Sign up</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-2xl mx-auto text-center px-8 py-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Share your work.<br />Get honest feedback.
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          A community where designers, writers, and developers
          critique each other's work and grow together.
        </p>
        <a href="/signup" className="inline-block px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800">
          Get started for free
        </a>
      </section>

      {/* Categories */}
      <section className="max-w-2xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-3 gap-4">
          {["Design", "Writing", "Code"].map((cat) => (
            <div key={cat} className="border border-gray-100 rounded-xl p-6 text-center">
              <p className="font-medium text-gray-900">{cat}</p>
              <p className="text-sm text-gray-400 mt-1">Submit & get critiqued</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}