'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const destinations = [
  { name: "Paris", emoji: "🗼", description: "City of Love" },
  { name: "Maldives", emoji: "🏝️", description: "Paradise Beach" },
  { name: "Tokyo", emoji: "🗾", description: "Adventure Together" },
  { name: "Santorini", emoji: "🇬🇷", description: "Sunset Romance" },
  { name: "Venice", emoji: "🚣", description: "Gondola Rides" },
  { name: "Bali", emoji: "🌺", description: "Tropical Dreams" }
]

export default function DreamTrips() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-blush via-light-pink to-soft-pink" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✈️
          </motion.div>
          <h2 className="font-great text-4xl md:text-6xl gradient-text mb-4">
            Our Dream Trips
          </h2>
          <p className="text-pink-600 font-dancing text-xl">
            Places I want to explore with you someday...
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              className="glass-effect rounded-2xl p-6 text-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 40px rgba(255, 105, 180, 0.3)'
              }}
            >
              <motion.div
                className="text-5xl mb-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
              >
                {dest.emoji}
              </motion.div>
              <h3 className="font-dancing text-2xl text-pink-700 mb-1">
                {dest.name}
              </h3>
              <p className="text-pink-500 text-sm">
                {dest.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center mt-12 font-dancing text-xl text-pink-600"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Anywhere with you is my favorite destination 💕
        </motion.p>
      </div>
    </section>
  )
}
