'use client'

import { useEffect, useState, useMemo } from 'react'

interface Heart {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  emoji: string
}

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const hearts = useMemo(() => {
    const emojis = ['❤️', '💕', '💗', '💖', '💝', '🌸', '✨']
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 8 + 12,
      size: Math.random() * 12 + 10,
      emoji: emojis[i % emojis.length]
    }))
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <div
          key={`floating-heart-${heart.id}`}
          className="absolute text-pink-400 floating-heart-anim"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            bottom: '-50px',
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`
          }}
        >
          {heart.emoji}
        </div>
      ))}
      <style jsx>{`
        .floating-heart-anim {
          animation: floatUp linear infinite;
          will-change: transform, opacity;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
