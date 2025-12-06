'use client'

import { motion } from 'framer-motion'
import { Info, AlertTriangle, Lightbulb, ImageIcon } from 'lucide-react'
import type { ContentBlock, GuideSection } from '@/content/guides/types'

// Image placeholder component
function ImagePlaceholder({ alt, caption }: { alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video bg-dark-800 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5" />
        <div className="flex flex-col items-center gap-3 text-white/40">
          <ImageIcon className="w-12 h-12" />
          <span className="text-sm text-center px-4">{alt}</span>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-white/50">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// Callout component
function Callout({ variant, content }: { variant: 'tip' | 'warning' | 'info'; content: string }) {
  const config = {
    tip: {
      icon: Lightbulb,
      bgClass: 'bg-neon-cyan/10 border-neon-cyan/30',
      iconClass: 'text-neon-cyan',
    },
    warning: {
      icon: AlertTriangle,
      bgClass: 'bg-orange-500/10 border-orange-500/30',
      iconClass: 'text-orange-400',
    },
    info: {
      icon: Info,
      bgClass: 'bg-neon-purple/10 border-neon-purple/30',
      iconClass: 'text-neon-purple',
    },
  }

  const { icon: Icon, bgClass, iconClass } = config[variant]

  return (
    <div className={`my-6 p-4 rounded-lg border ${bgClass} flex gap-3`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconClass}`} />
      <p className="text-white/80 leading-relaxed">{content}</p>
    </div>
  )
}

// Code block component
function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="my-6 relative">
      {language && (
        <div className="absolute top-0 right-0 px-3 py-1 text-xs text-white/40 bg-white/5 rounded-bl-lg rounded-tr-lg">
          {language}
        </div>
      )}
      <pre className="p-4 bg-dark-900 rounded-lg border border-white/10 overflow-x-auto">
        <code className="text-sm text-white/80 font-mono">{code}</code>
      </pre>
    </div>
  )
}

// Render a single content block
function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={index} className="text-white/70 leading-relaxed mb-4">
          {block.text}
        </p>
      )

    case 'heading':
      if (block.level === 2) {
        return (
          <h2
            key={index}
            id={block.id}
            className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
          >
            {block.text}
          </h2>
        )
      }
      return (
        <h3
          key={index}
          id={block.id}
          className="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-24"
        >
          {block.text}
        </h3>
      )

    case 'list':
      return (
        <ul key={index} className="my-4 space-y-2 pl-6">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="text-white/70 leading-relaxed list-disc marker:text-neon-cyan"
            >
              {item}
            </li>
          ))}
        </ul>
      )

    case 'code':
      return <CodeBlock key={index} code={block.code} language={block.language} />

    case 'inline-code':
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 bg-white/10 rounded text-neon-cyan text-sm font-mono"
        >
          {block.text}
        </code>
      )

    case 'image':
      return <ImagePlaceholder key={index} alt={block.alt} caption={block.caption} />

    case 'callout':
      return <Callout key={index} variant={block.variant} content={block.content} />

    case 'divider':
      return (
        <hr
          key={index}
          className="my-8 border-t border-white/10"
        />
      )

    default:
      return null
  }
}

interface ContentRendererProps {
  sections: GuideSection[]
}

export default function ContentRenderer({ sections }: ContentRendererProps) {
  return (
    <div className="prose-custom">
      {sections.map((section, sectionIndex) => (
        <motion.section
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
          className="mb-12 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
          {section.content.map((block, blockIndex) => renderBlock(block, blockIndex))}
        </motion.section>
      ))}
    </div>
  )
}
