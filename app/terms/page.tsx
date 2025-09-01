"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <p className="text-white/60 mb-12">Effective Date: January 2024</p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using CodeAgentSwarm ("the Application"), you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use the Application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="mb-4">
              CodeAgentSwarm is a development workflow enhancement tool that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provides an optimized interface for working with AI development agents</li>
              <li>Manages tasks and projects for development workflows</li>
              <li>Integrates with AI services like Claude Code through your own subscriptions</li>
              <li>Facilitates multi-agent collaboration in development environments</li>
            </ul>
            <p className="mt-4 font-medium">
              Important: CodeAgentSwarm does not provide AI services directly. You must have your own active 
              subscription to Claude Code or similar AI development tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Requirements</h2>
            <p className="mb-4">To use CodeAgentSwarm effectively, you must:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Have a valid subscription to Claude Code or compatible AI service</li>
              <li>Be at least 13 years of age</li>
              <li>Have the necessary hardware and software to run the Application</li>
              <li>Comply with the terms of service of all integrated third-party services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. License Grant</h2>
            <p>
              Subject to your compliance with these Terms, we grant you a personal, non-exclusive, non-transferable, 
              revocable license to use CodeAgentSwarm for your personal or internal business development purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. User Responsibilities</h2>
            <p className="mb-4">You are responsible for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Maintaining your own subscriptions to AI services (Claude Code, etc.)</li>
              <li>Ensuring the security of your API keys and credentials</li>
              <li>All code generated or modified using the Application</li>
              <li>Compliance with all applicable laws and regulations</li>
              <li>Backing up your data and projects</li>
              <li>Any consequences of code execution in your development environment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Prohibited Uses</h2>
            <p className="mb-4">You may not:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Use the Application for any illegal or unauthorized purpose</li>
              <li>Attempt to circumvent subscription requirements of third-party AI services</li>
              <li>Share or distribute AI service credentials through the Application</li>
              <li>Use the Application to develop malicious software or engage in harmful activities</li>
              <li>Reverse engineer, decompile, or disassemble the Application</li>
              <li>Remove or alter any proprietary notices or labels</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Third-Party Services</h2>
            <p className="mb-4">
              CodeAgentSwarm integrates with various third-party services including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Claude Code by Anthropic</li>
              <li>GitHub and GitHub Copilot</li>
              <li>Various MCP (Model Context Protocol) servers</li>
              <li>Other AI development assistants</li>
            </ul>
            <p className="mt-4">
              You acknowledge that your use of these services is governed by their respective terms of service and 
              privacy policies. We are not responsible for the availability, functionality, or content of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Disclaimer of Warranties</h2>
            <p>
              THE APPLICATION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR 
              IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
              AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE APPLICATION WILL BE UNINTERRUPTED, ERROR-FREE, OR 
              COMPLETELY SECURE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR 
              INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
              <li>Your use or inability to use the Application</li>
              <li>Any code generated or modified using the Application</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Statements or conduct of any third party on the Application</li>
              <li>Any other matter relating to the Application</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless CodeAgentSwarm and its affiliates, officers, directors, 
              employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable 
              attorney's fees, arising out of or in any way connected with your access to or use of the Application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you 
              by updating the date at the top of these Terms and, at our discretion, providing additional notice. Your 
              continued use of the Application after any modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. Termination</h2>
            <p>
              We may terminate or suspend your access to the Application immediately, without prior notice or liability, 
              for any reason, including if you breach these Terms. Upon termination, your right to use the Application 
              will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which 
              CodeAgentSwarm operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-none space-y-2 ml-4 mt-4">
              <li>Email: elcaminodelprogramadorweb@gmail.com</li>
              <li>Twitter/X: @art0xdev</li>
            </ul>
          </section>

          <section className="pt-8 border-t border-white/[0.08]">
            <h3 className="text-xl font-semibold text-white mb-4">Important Reminder</h3>
            <p className="text-white/60">
              CodeAgentSwarm is a tool designed to enhance your development workflow when using AI agents like Claude Code. 
              It does not provide AI capabilities itself - you must maintain your own subscriptions to AI services. 
              By using CodeAgentSwarm, you acknowledge this requirement and accept full responsibility for your use of 
              integrated AI services.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}