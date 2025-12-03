'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const promises = [
  "I promise to always make you laugh 😄",
  "I promise to hold your hand through everything 🤝",
  "I promise to be your biggest cheerleader 📣",
  "I promise to love you more every day 💕",
  "I promise to always listen to you 👂",
  "I promise to make you feel special always 👑",
  "I promise endless hugs and kisses 🤗",
  "I promise to grow old with you 👴👵",
  "I promise to support all your dreams ✨",
  "I promise to never stop trying to impress you 💪"
]

export default function PromiseJar() {
  const [drawnPromises, setDrawnPromises] = useState<string[]>([])
  const [currentPromise, setCurrentPromise] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const drawPromise = () => {
    const remaining = promises.filter(p => !drawnPromises.includes(p))
    if (remaining.length === 0) return

    setIsDrawing(true)
    
    setTimeout(() => {
      const randomPromise = remaining[Math.floor(Math.random() * remaining.length)]
      setCurrentPromise(randomPromise)
      setDrawnPromises(prev => [...prev, randomPromise])
      setIsDrawing(false)
    }, 1000)
  }

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-light-pink via-soft-pink to-lavender-blush" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🫙
          </motion.div>
          <h2 className="font-great text-4xl md:text-6xl gradient-text mb-4">
            My Promise Jar
          </h2>
          <p className="text-pink-600 font-dancing text-xl">
            Draw a promise from the jar of love!
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.button
            onClick={drawPromise}
            disabled={isDrawing || drawnPromises.length === promises.length}
            className={`px-8 py-4 rounded-full text-white font-dancing text-xl shadow-xl ${
              drawnPromises.length === promises.length
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-hot-pink to-rose hover:shadow-2xl'
            }`}
            whileHover={drawnPromises.length < promises.length ? { scale: 1.05 } : {}}
            whileTap={drawnPromises.length < promises.length ? { scale: 0.95 } : {}}
          >
            {isDrawing ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                Drawing... ✨
              </motion.span>
            ) : drawnPromises.length === promises.length ? (
              "All promises drawn! 💕"
            ) : (
              "Draw a Promise 🎁"
            )}
          </motion.button>

          <AnimatePresence>
            {currentPromise && (
              <motion.div
                className="mt-8 love-letter max-w-md text-center"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring' }}
              >
                <p className="font-dancing text-xl md:text-2xl text-pink-700">
                  {currentPromise}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            className="mt-8 text-pink-500 italic"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {drawnPromises.length} of {promises.length} promises drawn 💝
          </motion.p>
        </div>
      </div>
    </section>
  )
}
