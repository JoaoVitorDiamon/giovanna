import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const ease = [0.22, 1, 0.36, 1] as const

interface RevealTextProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'blockquote' | 'li' | 'div'
  once?: boolean
}

export function RevealText({
  children,
  className = '',
  delay = 0,
  as: Tag = 'p',
  once = true,
}: RevealTextProps) {
  const reduced = usePrefersReducedMotion()
  const MotionTag = motion.create(Tag)

  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, delay, ease }}
      viewport={once ? { once: true, amount: 0.4 } : undefined}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerLinesProps {
  lines: readonly string[]
  className?: string
  lineClassName?: string
  baseDelay?: number
  stagger?: number
  active?: boolean
}

export function StaggerLines({
  lines,
  className = '',
  lineClassName = '',
  baseDelay = 0.15,
  stagger = 0.55,
  active = true,
}: StaggerLinesProps) {
  const reduced = usePrefersReducedMotion()

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : baseDelay,
      },
    },
  }

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : 22,
      filter: reduced ? 'none' : 'blur(8px)',
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduced ? 0 : 1.05, ease },
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
    >
      {lines.map((line) => (
        <motion.p key={line} variants={item} className={lineClassName}>
          {line}
        </motion.p>
      ))}
    </motion.div>
  )
}

interface MaskRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  active?: boolean
}

export function MaskReveal({
  children,
  className = '',
  delay = 0,
  active = true,
}: MaskRevealProps) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={reduced ? false : { y: '110%' }}
        animate={active ? { y: 0 } : { y: '110%' }}
        transition={{ duration: reduced ? 0 : 1.15, delay, ease }}
      >
        {children}
      </motion.div>
    </div>
  )
}
