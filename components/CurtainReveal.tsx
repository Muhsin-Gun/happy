'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CurtainRevealProps {
  isOpen: boolean
  onComplete?: () => void
}

export default function CurtainReveal({ isOpen, onComplete }: CurtainRevealProps) {
  const [showCurtains, setShowCurtains] = useState(true)
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    if (isOpen && !animationStarted) {
      setAnimationStarted(true)
    }
  }, [isOpen, animationStarted])

  const handleAnimationComplete = () => {
    if (animationStarted) {
      setShowCurtains(false)
      onComplete?.()
    }
  }

  if (!showCurtains) return null

  return (
    <AnimatePresence mode="wait">
      {showCurtains && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-1/2 h-screen z-[100] flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #FF69B4 0%, #FF1493 100%)'
            }}
            initial={{ x: 0 }}
            animate={{ x: animationStarted ? '-100%' : 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            onAnimationComplete={handleAnimationComplete}
          >
            <motion.div 
              className="text-white text-6xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400" />
          </motion.div>

          <motion.div
            className="fixed top-0 right-0 w-1/2 h-screen z-[100] flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #FF69B4 0%, #FF1493 100%)'
            }}
            initial={{ x: 0 }}
            animate={{ x: animationStarted ? '100%' : 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div 
              className="text-white text-6xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.div>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
