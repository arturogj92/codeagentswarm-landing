export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-4 mb-6">
        <div className="h-9 w-20 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-9 w-24 bg-white/5 rounded-lg animate-pulse" />
      </div>
      <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-4 py-3 border-b border-white/5"
          >
            <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-32 bg-white/5 rounded animate-pulse ml-auto" />
            <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse" />
            <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
