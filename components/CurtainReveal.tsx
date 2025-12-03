'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

interface CurtainRevealProps {
  isOpen: boolean
  onComplete?: () => void
}

export default function CurtainReveal({ isOpen, onComplete }: CurtainRevealProps) {
  const leftCurtainRef = useRef<HTMLDivElement>(null)
  const rightCurtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline({ onComplete })

      tl.to(leftCurtainRef.current, {
        x: '-100%',
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0)
      .to(rightCurtainRef.current, {
        x: '100%',
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0)
    }
  }, [isOpen, onComplete])

  if (isOpen) return null

  return (
    <>
      <motion.div
        ref={leftCurtainRef}
        className="curtain curtain-left"
        initial={{ x: 0 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-1 bg-gradient-to-r from-pink-400/30 to-transparent"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </div>
        <div className="text-white text-4xl font-dancing">
          ❤️
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-gold/50 to-transparent" />
      </motion.div>

      <motion.div
        ref={rightCurtainRef}
        className="curtain curtain-right"
        initial={{ x: 0 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-1 bg-gradient-to-l from-pink-400/30 to-transparent"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </div>
        <div className="text-white text-4xl font-dancing">
          ❤️
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-gold/50 to-transparent" />
      </motion.div>
    </>
  )
}
