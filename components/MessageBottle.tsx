'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

interface MessageBottleProps {
  message: string
}

export default function MessageBottle({ message }: MessageBottleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-cyan-50 to-pink-100" />

      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(0, 150, 200, 0.1) 0%, transparent 50%)',
          backgroundSize: '200% 200%'
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-great text-4xl md:text-6xl gradient-text mb-4">
            A Message Just For You
          </h2>
          <p className="text-pink-600 font-dancing text-xl">
            There's something floating in the ocean of my love...
          </p>
        </motion.div>

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="bottle"
                className="cursor-pointer relative"
                onClick={() => setIsOpen(true)}
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                exit={{ scale: 0, opacity: 0, rotate: 360 }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="text-9xl"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🍾
                </motion.div>

                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-2xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨
                </motion.div>

                <motion.p
                  className="text-center mt-4 text-pink-600 font-dancing text-lg"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to open!
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="message"
                className="love-letter max-w-lg w-full"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 1 }}
              >
                <motion.div
                  className="text-center mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-5xl">💌</span>
                </motion.div>

                <motion.p
                  className="text-xl md:text-2xl text-pink-700 leading-relaxed text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {message}
                </motion.p>

                <motion.div
                  className="text-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-3xl">❤️</span>
                </motion.div>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="block mx-auto mt-6 text-pink-500 hover:text-pink-700 transition-colors font-dancing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  Put it back in the bottle 🍾
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
