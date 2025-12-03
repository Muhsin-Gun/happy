'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ReasonsSectionProps {
  reasons: string[]
}

export default function ReasonsSection({ reasons }: ReasonsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-blush via-white to-soft-pink" />
      
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            {['💕', '✨', '💗', '🌸', '💝'][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💖
          </motion.div>
          <h2 className="font-great text-5xl md:text-7xl gradient-text mb-4">
            Why I Love You
          </h2>
          <p className="text-pink-600 font-dancing text-xl">
            Here are just a few of the million reasons...
          </p>
        </motion.div>

        <div className="space-y-6">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-dancing text-2xl text-pink-600">
            ...and a million more reasons I could never fit on this page 💕
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function ReasonCard({ reason, index }: { reason: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="glass-effect rounded-2xl p-6 flex items-center gap-6"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 10 }}
    >
      <motion.div
        className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-hot-pink to-rose flex items-center justify-center text-white font-bold text-lg"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {index + 1}
      </motion.div>
      
      <p className="font-dancing text-xl md:text-2xl text-pink-700 flex-grow">
        {reason}
      </p>
      
      <motion.span
        className="text-2xl flex-shrink-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
      >
        {['❤️', '💕', '💗', '💖', '💝', '🌸', '✨', '🦋', '🌹', '💫'][index % 10]}
      </motion.span>
    </motion.div>
  )
}
