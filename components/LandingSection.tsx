'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

interface LandingSectionProps {
  name: string
  message: string
  subtitle: string
  onEnter: () => void
}

export default function LandingSection({ name, message, subtitle, onEnter }: LandingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLSpanElement[]>([])
  const [showButton, setShowButton] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [bubbles, setBubbles] = useState<Array<{id: number, left: number, top: number, width: number, height: number, opacity: number}>>([])

  const fullMessage = `${message} ${name}`

  useEffect(() => {
    setMounted(true)
    const newBubbles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      opacity: Math.random() * 0.2
    }))
    setBubbles(newBubbles)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const tl = gsap.timeline()

    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        tl.fromTo(letter,
          { 
            y: -200, 
            opacity: 0, 
            rotationX: 90,
            scale: 0.5
          },
          { 
            y: 0, 
            opacity: 1, 
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            ease: 'bounce.out'
          },
          index * 0.08
        )
      }
    })

    tl.call(() => setShowButton(true), [], '+=0.5')
  }, [mounted])

  if (!mounted) return null

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-blush via-light-pink to-soft-pink" />

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {bubbles.map((bubble) => (
          <motion.div
            key={`bubble-${bubble.id}`}
            className="absolute rounded-full"
            style={{
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: `${bubble.width}px`,
              height: `${bubble.height}px`,
              background: `radial-gradient(circle, rgba(255, 105, 180, ${bubble.opacity}) 0%, transparent 70%)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, (bubble.id % 2 === 0 ? 25 : -25), 0],
              y: [0, (bubble.id % 2 === 0 ? -25 : 25), 0]
            }}
            transition={{
              duration: 5 + (bubble.id % 5),
              repeat: Infinity,
              delay: bubble.id * 0.1
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(255, 215, 0, 0.15) 0%, transparent 60%)'
        }}
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          className="text-6xl mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          🎂
        </motion.div>

        <h1 className="font-great text-4xl sm:text-6xl md:text-8xl mb-6 overflow-visible">
          {fullMessage.split('').map((char, index) => (
            <span
              key={`letter-${index}-${char}`}
              ref={el => { if (el) lettersRef.current[index] = el }}
              className={`inline-block ${char === ' ' ? 'mx-2' : ''}`}
              style={{
                color: index >= message.length ? '#FF1493' : '#FF69B4',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <motion.p
          className="font-dancing text-2xl md:text-4xl text-pink-600 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          {subtitle}
        </motion.p>

        {showButton && (
          <motion.button
            onClick={onEnter}
            className="relative px-10 py-5 bg-gradient-to-r from-hot-pink to-rose text-white text-xl font-dancing rounded-full shadow-xl overflow-hidden group"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              Open Your Surprise
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                ❤️
              </motion.span>
            </span>
          </motion.button>
        )}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-pink-400 text-sm font-dancing">Scroll down for more magic ✨</span>
      </motion.div>
    </section>
  )
}
