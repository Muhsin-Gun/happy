'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const jokes = [
  { front: "Remember when...", back: "We stayed up talking until sunrise? 🌅" },
  { front: "That time we...", back: "Couldn't stop laughing at the silliest thing! 😂" },
  { front: "Our secret is...", back: "How much we love being silly together 🤪" },
  { front: "You always say...", back: "The cutest things that make my heart melt 💕" },
  { front: "I love when you...", back: "Give me that special look only I understand 👀" },
  { front: "We both know...", back: "We're the best couple ever! 👑" }
]

export default function InsideJokes() {
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleFlip = (index: number) => {
    if (flippedCards.includes(index)) {
      setFlippedCards(prev => prev.filter(i => i !== index))
    } else {
      setFlippedCards(prev => [...prev, index])
    }
  }

  if (!mounted) return null

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soft-pink via-lavender-blush to-light-pink" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🤫
          </motion.div>
          <h2 className="font-great text-4xl md:text-6xl gradient-text mb-4">
            Our Inside Jokes
          </h2>
          <p className="text-pink-600 font-dancing text-xl">
            Tap the cards to reveal our secrets!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jokes.map((joke, index) => (
            <motion.div
              key={`joke-card-${index}`}
              className="h-40 cursor-pointer"
              style={{ perspective: '1000px' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleFlip(index)}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div 
                  className="absolute inset-0 glass-effect rounded-2xl p-6 flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="font-dancing text-xl text-pink-700 text-center">
                    {joke.front}
                  </p>
                  <motion.span
                    className="absolute bottom-2 right-2 text-lg"
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    👆
                  </motion.span>
                </div>

                <div 
                  className="absolute inset-0 bg-gradient-to-br from-hot-pink to-rose rounded-2xl p-6 flex items-center justify-center"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <p className="font-dancing text-xl text-white text-center">
                    {joke.back}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
