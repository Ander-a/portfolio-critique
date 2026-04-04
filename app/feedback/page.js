export default function Feedback() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <a href="/" className="font-semibold text-gray-900">Portfolio Critique</a>
        <a href="/browse" className="text-sm text-gray-500 hover:text-gray-900">Browse work</a>
      </nav>

      <section className="max-w-2xl mx-auto px-8 py-12">
        <div className="border border-gray-100 rounded-xl p-6 mb-8">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Design</span>
          <h1 className="text-xl font-bold text-gray-900 mt-2 mb-1">Mobile banking app redesign</h1>
          <p className="text-sm text-gray-500 mb-4">by Alex K.</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            I redesigned the onboarding flow for a mobile banking app focusing on simplicity
            and trust. Looking for feedback on the visual hierarchy and user flow.
          </p>
          <a href="#" className="inline-block mt-4 text-sm text-black font-medium hover:underline">
            View work →
          </a>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-6">Give your feedback</h2>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What works well?</label>
            <p className="text-xs text-gray-400 mb-2">Be specific — point out what's strong and why.</p>
            <textarea rows={3} placeholder="e.g. The colour palette feels trustworthy..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What could be improved?</label>
            <p className="text-xs text-gray-400 mb-2">Constructive suggestions only — be kind but honest.</p>
            <textarea rows={3} placeholder="e.g. The CTA button gets lost on the third screen..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-400 resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Overall rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n}
                  className="w-10 h-10 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors">
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-gray-800">
            Submit feedback
          </button>
        </div>
      </section>
    </main>
  )
}