'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMoveRef.current < 100) return
      lastMoveRef.current = now
      
      const newHeart: Heart = {
        id: idCounterRef.current++,
        x: e.clientX,
        y: e.clientY
      }
      
      setHearts(prev => [...prev.slice(-8), newHeart])
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    
    const cleanup = setInterval(() => {
      setHearts(prev => prev.slice(-4))
    }, 600)

    return () => clearInterval(cleanup)
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={`cursor-heart-${heart.id}`}
            className="absolute text-pink-400"
            style={{
              left: heart.x,
              top: heart.y,
              fontSize: '12px'
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
