'use client'

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer"
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST' })
        window.location.href = '/login'
      }}
    >
      Sign out
    </button>
  )
}
