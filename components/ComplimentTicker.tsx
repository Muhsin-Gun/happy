'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const compliments = [
  "You're absolutely stunning ✨",
  "Your smile does things to me 🌟",
  "You make everything better 💕",
  "You're my favorite person 💗",
  "You're so beautiful it hurts 🌸",
  "Your laugh is my favorite sound 🎵",
  "You're sweeter than you know 🍯",
  "You're my sunshine on bad days ☀️",
  "You're perfect for me 💝",
  "You make my heart race 🦋",
  "You're literally a dream 🌙",
  "You're absolutely incredible 💫",
  "You're my whole world 💖",
  "You take my breath away 😍",
  "You're one in 8 billion 🏆"
]

export default function ComplimentTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isInView || !mounted) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % compliments.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isInView, mounted])

  if (!mounted) return null

  return (
    <section ref={ref} className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-hot-pink via-rose to-hot-pink opacity-90" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <h3 className="text-white font-dancing text-xl mb-4 opacity-80">
            Just so you know...
          </h3>
          
          <div className="h-20 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={`compliment-${currentIndex}`}
                className="font-great text-3xl md:text-5xl text-white drop-shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {compliments[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {compliments.map((_, index) => (
              <motion.div
                key={`dot-${index}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/40'
                }`}
                animate={index === currentIndex ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
