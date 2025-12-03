'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface HeartbeatLineProps {
  name: string
}

export default function HeartbeatLine({ name }: HeartbeatLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-blush to-soft-pink" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 className="font-great text-4xl md:text-6xl gradient-text mb-4">
            My Heart Beats For You
          </h2>
        </motion.div>

        <div className="relative h-40 flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 800 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <motion.path
              d="M0,50 L100,50 L120,50 L140,20 L160,80 L180,50 L200,50 L220,50 L240,10 L260,90 L280,50 L300,50 L350,50 L370,50 L390,20 L410,80 L430,50 L450,50 L500,50 L520,50 L540,10 L560,90 L580,50 L600,50 L650,50 L670,50 L690,20 L710,80 L730,50 L800,50"
              fill="none"
              stroke="#FF69B4"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </svg>

          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: [0, 1.2, 1] } : {}}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <span className="text-6xl">❤️</span>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
              >
                <span className="text-white text-xs font-dancing font-bold drop-shadow-lg">
                  {name}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          className="text-center font-dancing text-xl text-pink-600 mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5 }}
        >
          Every beat of my heart whispers your name... 💕
        </motion.p>
      </div>
    </section>
  )
}
