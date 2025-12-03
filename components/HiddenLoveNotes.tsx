'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const loveNotes = [
  "You make my heart skip a beat every single day 💕",
  "Your laugh is my favorite sound in the world 🎵",
  "Being with you feels like coming home 🏠",
  "You're my favorite person to do nothing with ✨",
  "I fall more in love with you every day 📈❤️",
  "You're the reason I believe in soulmates 👫",
  "My heart chose you and it was the best decision 💗",
  "You're my today and all of my tomorrows 🌅",
  "Life with you is an adventure I never want to end 🎢"
]

export default function HiddenLoveNotes() {
  const [revealedNotes, setRevealedNotes] = useState<number[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const toggleNote = (index: number) => {
    if (revealedNotes.includes(index)) {
      setRevealedNotes(prev => prev.filter(i => i !== index))
    } else {
      setRevealedNotes(prev => [...prev, index])
    }
  }

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-light-pink via-lavender-blush to-soft-pink" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💝
          </motion.div>
          <h2 className="font-great text-4xl md:text-6xl gradient-text mb-4">
            Hidden Love Notes
          </h2>
          <p className="text-pink-600 font-dancing text-xl">
            Click the hearts to reveal secret messages!
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {loveNotes.map((note, index) => (
            <motion.div
              key={index}
              className="aspect-square relative cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleNote(index)}
            >
              <AnimatePresence mode="wait">
                {!revealedNotes.includes(index) ? (
                  <motion.div
                    key="heart"
                    className="w-full h-full flex items-center justify-center"
                    exit={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.span
                      className="text-4xl md:text-6xl"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {['❤️', '💕', '💗', '💖', '💝', '🌸', '✨', '🦋', '🌹'][index % 9]}
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="note"
                    className="w-full h-full glass-effect rounded-xl p-4 flex items-center justify-center"
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring' }}
                  >
                    <p className="text-xs md:text-sm text-pink-700 text-center font-dancing leading-relaxed">
                      {note}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center mt-8 text-pink-500 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          Found {revealedNotes.length} of {loveNotes.length} love notes 💌
        </motion.p>
      </div>
    </section>
  )
}
