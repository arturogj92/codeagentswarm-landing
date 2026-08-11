'use client'

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="whitespace-nowrap rounded-lg px-2 py-1.5 text-xs text-white/55 transition-colors hover:bg-white/[0.05] hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = '/login'
      }}
    >
      Sign out
    </button>
  )
}
