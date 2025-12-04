'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface FloatingBalloonsProps {
  name: string
}

export default function FloatingBalloons({ name }: FloatingBalloonsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const balloons = [
    { text: name, color: 'from-pink-400 to-pink-600', delay: 0 },
    { text: 'LOVE', color: 'from-red-400 to-red-600', delay: 0.2 },
    { text: 'HAPPY', color: 'from-purple-400 to-purple-600', delay: 0.4 },
    { text: 'BIRTHDAY', color: 'from-rose-400 to-rose-600', delay: 0.6 },
    { text: '❤️', color: 'from-hot-pink to-rose', delay: 0.8 }
  ]

  if (!mounted) return null

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden min-h-[60vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-soft-pink via-lavender-blush to-light-pink" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-great text-4xl md:text-6xl gradient-text">
            Floating With Love
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {balloons.map((balloon, index) => (
            <motion.div
              key={`balloon-${balloon.text}-${index}`}
              className="relative"
              initial={{ y: 200, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: balloon.delay, duration: 1, type: 'spring' }}
            >
              <motion.div
                className={`w-24 h-32 md:w-32 md:h-44 rounded-full bg-gradient-to-b ${balloon.color} flex items-center justify-center shadow-xl relative`}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
                
                <span className="text-white font-dancing text-lg md:text-xl text-center px-2 relative z-10 drop-shadow-md">
                  {balloon.text}
                </span>

                <div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-400"
                />
                
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎀
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
