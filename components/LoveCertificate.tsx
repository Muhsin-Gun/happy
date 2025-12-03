'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface LoveCertificateProps {
  title: string
  awardedTo: string
  forText: string
  signedBy: string
}

export default function LoveCertificate({ title, awardedTo, forText, signedBy }: LoveCertificateProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="relative max-w-2xl mx-auto p-1 rounded-lg"
      style={{
        background: 'linear-gradient(135deg, #FFD700 0%, #FF69B4 50%, #FFD700 100%)'
      }}
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 1, type: 'spring' }}
    >
      <div className="bg-gradient-to-br from-cream-50 to-pink-50 rounded-lg p-8 md:p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE4E1 100%)' }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="absolute top-4 left-4 text-4xl">🎀</div>
        <div className="absolute top-4 right-4 text-4xl">🎀</div>
        <div className="absolute bottom-4 left-4 text-4xl">🎀</div>
        <div className="absolute bottom-4 right-4 text-4xl">🎀</div>

        <div className="text-center relative z-10">
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🏆
          </motion.div>

          <motion.h3
            className="font-great text-3xl md:text-5xl text-gold mb-6"
            style={{ color: '#B8860B' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h3>

          <motion.div
            className="my-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>

          <motion.p
            className="text-pink-600 text-lg mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            This certifies that
          </motion.p>

          <motion.h4
            className="font-dancing text-4xl md:text-6xl gradient-text mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, type: 'spring' }}
          >
            {awardedTo}
          </motion.h4>

          <motion.p
            className="text-pink-600 text-lg mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            has been officially recognized for
          </motion.p>

          <motion.p
            className="font-dancing text-xl md:text-2xl text-pink-700 mb-8 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            "{forText}"
          </motion.p>

          <motion.div
            className="my-8"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6 }}
          >
            <p className="text-pink-500 text-sm mb-2">Officially signed by</p>
            <p className="font-great text-2xl text-hot-pink">{signedBy}</p>
            <p className="text-pink-400 text-sm mt-2">
              {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>

          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-4xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
