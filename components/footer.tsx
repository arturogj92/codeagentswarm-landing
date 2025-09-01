"use client"

import { Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative border-t border-white/[0.08] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
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
          
          <p className="text-white/60 text-center max-w-2xl">
            AI-powered development workflow with intelligent task management and seamless collaboration.
          </p>

          {/* Social Link */}
          <a 
            href="https://x.com/art0xdev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white/[0.08] rounded-lg flex items-center justify-center hover:bg-white/[0.12] transition-colors duration-200"
            aria-label="Follow us on X (Twitter)"
          >
            <Twitter className="w-6 h-6 text-white/70" />
          </a>

          {/* Legal Links */}
          <div className="flex gap-8">
            <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              Contact
            </Link>
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-white/40 text-sm text-center">
            © {currentYear} CodeAgentSwarm. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}