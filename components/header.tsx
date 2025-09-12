"use client"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="CodeAgentSwarm Logo" 
            className="w-12 h-12 drop-shadow-lg"
          />
          <span className="text-white font-bold text-xl tracking-wider font-[var(--font-orbitron)]">
            CODEAGENTSWARM
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#roadmap"
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Roadmap
          </a>
          <a
            href="#demo"
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Demo
          </a>
          <a
            href="#pricing"
            className="text-sm text-white/70 hover:text-white transition-colors duration-200"
          >
            Pricing
          </a>
        </nav>

        {/* Download Button */}
        <a href="#download">
          <button className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors duration-200">
            Download
          </button>
        </a>
      </div>
    </header>
  )
}