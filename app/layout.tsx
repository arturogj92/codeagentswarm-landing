import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron"
})

export const metadata: Metadata = {
  title: "CodeAgentSwarm - AI-Powered Development Workflow",
  description: "Transform your development workflow with AI agents. Intelligent task management, seamless terminal integration, and collaborative workflows for modern developers.",
  keywords: "AI development, task management, terminal, git integration, development workflow, code agents, productivity tools",
  authors: [{ name: "CodeAgentSwarm Team" }],
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "CodeAgentSwarm - AI-Powered Development Workflow",
    description: "Transform your development workflow with AI agents. Intelligent task management, seamless terminal integration, and collaborative workflows.",
    type: "website",
    url: "https://codeagentswarm.dev",
    images: ['/logo.png']
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeAgentSwarm - AI-Powered Development Workflow",
    description: "Transform your development workflow with AI agents. Intelligent task management, seamless terminal integration, and collaborative workflows.",
    images: ['/logo.png']
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${orbitron.variable}`}>{children}</body>
    </html>
  )
}