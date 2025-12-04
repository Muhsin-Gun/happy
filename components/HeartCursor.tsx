'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

interface Heart {
  id: number
  x: number
  y: number
}

export default function HeartCursor() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const idCounterRef = useRef(0)
  const [mounted, setMounted] = useState(false)
  const lastMoveRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    if (now - lastMoveRef.current < 150) return
    lastMoveRef.current = now
    
    const newHeart: Heart = {
      id: idCounterRef.current++,
      x: e.clientX,
      y: e.clientY
    }
    
    setHearts(prev => [...prev.slice(-5), newHeart])
  }, [])

  useEffect(() => {
    if (!mounted || isMobile) return
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted, isMobile, handleMouseMove])

  useEffect(() => {
    if (!mounted || isMobile) return
    
    const cleanup = setInterval(() => {
      setHearts(prev => prev.length > 0 ? prev.slice(-3) : prev)
    }, 800)

    return () => clearInterval(cleanup)
  }, [mounted, isMobile])

  if (!mounted || isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map((heart) => (
        <div
          key={`cursor-heart-${heart.id}`}
          className="absolute text-pink-400 heart-fade"
          style={{
            left: heart.x - 6,
            top: heart.y - 6,
            fontSize: '12px'
          }}
        >
          ❤️
        </div>
      ))}
      <style jsx>{`
        .heart-fade {
          animation: fadeUp 0.8s ease-out forwards;
          will-change: transform, opacity;
        }
        @keyframes fadeUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0);
          }
        }
      `}</style>
    </div>
  )
}
