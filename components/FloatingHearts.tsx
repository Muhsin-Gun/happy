'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Heart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  emoji: string
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const emojis = ['❤️', '💕', '💗', '💖', '💝', '🌸', '✨']
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 15,
      size: Math.random() * 15 + 12,
      emoji: emojis[i % emojis.length]
    }))
    setHearts(newHearts)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <motion.div
          key={`floating-heart-${heart.id}`}
          className="absolute text-pink-400"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            bottom: '-50px'
          }}
          animate={{
            y: [0, -1200],
            x: [0, Math.sin(heart.id) * 30, 0],
            rotate: [0, 360],
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  )
}
