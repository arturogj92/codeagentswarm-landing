'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Info, AlertTriangle, Lightbulb, ImageIcon } from 'lucide-react'
import type { ContentBlock, GuideSection } from '@/content/guides/types'

const GUIDE_IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '/images/guides/resume-conversation.png': { width: 1316, height: 1195 },
  '/images/guides/task-board-kanban.png': { width: 3024, height: 1964 },
  '/images/guides/codex-agent-swarm.png': { width: 3024, height: 1964 },
  '/images/guides/multi-terminal.png': { width: 3016, height: 1758 },
  '/images/guides/multi-cli-agent-selector.png': { width: 2782, height: 1624 },
  '/images/guides/antigravity-agent-swarm.png': { width: 2782, height: 1606 },
  '/images/guides/multi-cli-three-agents.png': { width: 3024, height: 1964 },
  '/images/guides/opencode-agent-swarm.png': { width: 3020, height: 1768 },
}

// Image placeholder component (when src is '#' or missing)
function ImagePlaceholder({ alt, caption }: { alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video bg-neutral-900 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
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

// Real image component with size variants
function GuideImage({ src, alt, caption, size = 'full' }: { src: string; alt: string; caption?: string; size?: 'inline' | 'small' | 'medium' | 'full' }) {
  // Inline: very small, displayed inline with text
  if (size === 'inline') {
    return (
      <span className="inline-block my-2">
        <img
          src={src}
          alt={alt}
          className="h-12 w-auto rounded-lg border border-white/10"
          loading="lazy"
        />
      </span>
    )
  }

  // Size classes for figure-based images - responsive: full width on mobile, constrained on larger screens
  const figureSizeClasses = {
    small: 'max-w-full sm:max-w-xs mx-auto',
    medium: 'max-w-full sm:max-w-lg mx-auto',
    full: 'w-full',
  }
  const dimensions = GUIDE_IMAGE_DIMENSIONS[src]
  const sizes = size === 'small'
    ? '(max-width: 640px) calc(100vw - 2rem), 320px'
    : size === 'medium'
      ? '(max-width: 640px) calc(100vw - 2rem), 512px'
      : '(max-width: 1024px) calc(100vw - 2rem), 820px'

  return (
    <figure className={`my-8 ${figureSizeClasses[size] || ''}`}>
      <div className="relative rounded-xl border border-white/10 overflow-hidden">
        {dimensions ? (
          <Image
            src={src}
            alt={alt}
            width={dimensions.width}
            height={dimensions.height}
            sizes={sizes}
            className="w-full h-auto"
          />
        ) : (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
            loading="lazy"
          />
        )}
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
      bgClass: 'bg-white/5 border-white/20',
      iconClass: 'text-white/70',
    },
  }

  const { icon: Icon, bgClass, iconClass } = config[variant]

  return (
    <div className={`my-6 p-4 rounded-lg border ${bgClass} flex gap-3`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconClass}`} />
      <p
        className="text-white/80 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
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

// Brand cells: when a table header or a row's first cell is exactly our
// product name, show the isotype next to it. The name stays real text in
// the DOM (never replaced by the image), so crawlers and AI readers still
// see the brand as text. alt is empty because the adjacent text carries it.
const BRAND_NAME = 'CodeAgentSwarm'

const isBrandCell = (html: string): boolean =>
  html.replace(/<[^>]*>/g, '').trim() === BRAND_NAME

function BrandCell({ html }: { html: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Image src="/isotipo.png" alt="" width={20} height={20} className="shrink-0" />
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  )
}

// Render a single content block
function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          className="text-white/70 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
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
              dangerouslySetInnerHTML={{ __html: item }}
            />
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
      // Use placeholder if src is '#' or empty, otherwise show real image
      if (!block.src || block.src === '#') {
        return <ImagePlaceholder key={index} alt={block.alt} caption={block.caption} />
      }
      return <GuideImage key={index} src={block.src} alt={block.alt} caption={block.caption} size={block.size} />

    case 'video':
      return (
        <figure key={index} className="my-8">
          <div className="relative rounded-xl border border-white/10 overflow-hidden">
            <video
              src={block.src}
              poster={block.poster}
              controls
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-white/50">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'callout':
      return <Callout key={index} variant={block.variant} content={block.content} />

    case 'divider':
      return (
        <hr
          key={index}
          className="my-8 border-t border-white/10"
        />
      )

    case 'table':
      return (
        <figure key={index} className="my-8">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/5">
                  {block.headers.map((h, i) =>
                    isBrandCell(h) ? (
                      <th
                        key={i}
                        className="px-4 py-3 text-left font-semibold text-white whitespace-nowrap"
                      >
                        <BrandCell html={h} />
                      </th>
                    ) : (
                      <th
                        key={i}
                        className="px-4 py-3 text-left font-semibold text-white whitespace-nowrap"
                        dangerouslySetInnerHTML={{ __html: h }}
                      />
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {block.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) =>
                      ci === 0 && isBrandCell(cell) ? (
                        <td
                          key={ci}
                          className={`px-4 py-3 align-top leading-relaxed ${ci === 0 ? 'font-medium text-white' : 'text-white/70'}`}
                        >
                          <BrandCell html={cell} />
                        </td>
                      ) : (
                        <td
                          key={ci}
                          className={`px-4 py-3 align-top leading-relaxed ${ci === 0 ? 'font-medium text-white' : 'text-white/70'}`}
                          dangerouslySetInnerHTML={{ __html: cell }}
                        />
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-white/50">
              {block.caption}
            </figcaption>
          )}
        </figure>
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
