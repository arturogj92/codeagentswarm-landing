"use client"

import { Github, Twitter, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">CodeAgentSwarm</span>
            </div>
            
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              AI-powered development workflow with intelligent task management and seamless collaboration.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/art0xdev/codeagentswarm"
                className="w-10 h-10 bg-white/[0.08] rounded-lg flex items-center justify-center hover:bg-white/[0.12] transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-white/70" />
              </a>
              <a 
                href="https://twitter.com/art0xdev"
                className="w-10 h-10 bg-white/[0.08] rounded-lg flex items-center justify-center hover:bg-white/[0.12] transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white/70" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Demo
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Downloads
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.08] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/40 text-sm">
            © 2024 CodeAgentSwarm. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors duration-200">
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}