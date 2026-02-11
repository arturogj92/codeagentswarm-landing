import { cn } from '@/lib/utils'

interface LogoTextProps {
  className?: string
}

export default function LogoText({ className }: LogoTextProps) {
  return (
    <span
      className={cn(
        'tracking-wider uppercase',
        className
      )}
      style={{ fontFamily: 'var(--font-handel), sans-serif' }}
    >
      <span className="text-white">CODE</span>
      <span className="text-amber-400">AGENT</span>
      <span className="text-white">SWARM</span>
    </span>
  )
}
