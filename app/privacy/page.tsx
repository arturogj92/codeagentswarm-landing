"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-white/60 mb-12">Last updated: January 2024</p>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to CodeAgentSwarm. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we handle your information when you use our application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Important Notice About AI Agents</h2>
            <p className="mb-4">
              CodeAgentSwarm is a tool that enhances your experience with AI development agents, specifically designed 
              to work with services like Claude Code and other AI assistants. Please note:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You must have your own subscription to Claude Code or similar AI services</li>
              <li>CodeAgentSwarm does not provide AI services directly</li>
              <li>We do not have access to your AI service subscriptions or API keys</li>
              <li>All AI processing happens through your own accounts with third-party providers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Storage and Privacy</h2>
            <p className="mb-4">Your privacy is paramount. Here's how we handle data:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Task Management Data:</strong> All tasks you create (titles, descriptions, status) are stored ONLY on your local machine</li>
              <li><strong>Project Information:</strong> Project names and configurations are saved ONLY on your device</li>
              <li><strong>Local Storage:</strong> 100% of your data remains on your machine - we have NO access to your tasks, projects, or work</li>
              <li><strong>What We Access:</strong> We ONLY receive anonymous error logs to help fix bugs and improve stability</li>
              <li><strong>Zero Cloud Storage:</strong> We do not store, transmit, or have access to any of your personal data or work content</li>
            </ul>
            <p className="mt-4 text-white/90 font-medium">
              Important: All your tasks, projects, and work data are stored exclusively on your computer. 
              We cannot see, access, or retrieve this information. The only data we receive are error logs for debugging purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. How Your Data is Used</h2>
            <p className="mb-4">Since all data stays on your machine, it is used locally to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Manage and track your development tasks on YOUR device</li>
              <li>Organize your projects and workflows on YOUR computer</li>
              <li>Synchronize data between different terminal windows on YOUR system</li>
              <li>The ONLY data we receive: Anonymous error logs to fix bugs and improve stability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Complete Local Control</h2>
            <p className="mb-4">
              You have absolute control over your data:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>All task and project data exists ONLY on your device</li>
              <li>We CANNOT access, view, or retrieve your tasks or projects</li>
              <li>Database files are stored in your local application support directory</li>
              <li>You can delete all data at any time by removing the application files</li>
              <li>No cloud backup, no remote access, no data mining - your work is 100% private</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Third-Party Services</h2>
            <p className="mb-4">
              CodeAgentSwarm integrates with various third-party services that you configure:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>AI Services:</strong> Claude Code, GitHub Copilot, and other AI assistants (requires your own subscription)</li>
              <li><strong>MCP Servers:</strong> Various Model Context Protocol servers you choose to install</li>
              <li><strong>Development Tools:</strong> Git, npm, and other development tools on your system</li>
            </ul>
            <p className="mt-4">
              Each third-party service has its own privacy policy and terms of service. We recommend reviewing these 
              policies for services you use with CodeAgentSwarm.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access all data stored by CodeAgentSwarm on your device</li>
              <li>Delete your data at any time by removing the application data</li>
              <li>Export your task and project data</li>
              <li>Opt-out of anonymous usage analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Children's Privacy</h2>
            <p>
              CodeAgentSwarm is not intended for use by children under 13 years of age. We do not knowingly collect 
              personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the 
              new privacy policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our practices, please contact us at:
            </p>
            <ul className="list-none space-y-2 ml-4 mt-4">
              <li>Email: elcaminodelprogramadorweb@gmail.com</li>
              <li>Twitter/X: @art0xdev</li>
            </ul>
          </section>

          <section className="pt-8 border-t border-white/[0.08]">
            <p className="text-white/60 text-sm">
              By using CodeAgentSwarm, you acknowledge that you understand and agree to this privacy policy. 
              Remember that CodeAgentSwarm is a tool to enhance your development workflow with AI agents, and you 
              are responsible for maintaining your own subscriptions to AI services like Claude Code.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}