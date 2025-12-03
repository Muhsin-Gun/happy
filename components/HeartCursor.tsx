'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Heart {
  id: number
  x: number
  y: number
}

export default function HeartCursor() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [idCounter, setIdCounter] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newHeart: Heart = {
        id: idCounter,
        x: e.clientX,
        y: e.clientY
      }
      
      setHearts(prev => [...prev.slice(-15), newHeart])
      setIdCounter(prev => prev + 1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [idCounter])

  useEffect(() => {
    const cleanup = setInterval(() => {
      setHearts(prev => prev.slice(-10))
    }, 500)

    return () => clearInterval(cleanup)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-400"
            style={{
              left: heart.x,
              top: heart.y,
              fontSize: '12px'
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
