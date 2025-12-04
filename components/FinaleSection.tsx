'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import confetti from 'canvas-confetti'
import LoveCertificate from './LoveCertificate'

interface FinaleSectionProps {
  finalMessage: string
  certificate: {
    title: string
    awardedTo: string
    for: string
    signedBy: string
  }
}

export default function FinaleSection({ finalMessage, certificate }: FinaleSectionProps) {
  const [showSurprise, setShowSurprise] = useState(false)
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  const triggerFireworks = () => {
    const duration = 6000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 100 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FF69B4', '#FFD700', '#FF1493', '#FFC0CB', '#FF6B6B', '#8B5CF6']
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FF69B4', '#FFD700', '#FF1493', '#FFC0CB', '#FF6B6B', '#8B5CF6']
      })
    }, 200)

    setShowSurprise(true)
    setTimeout(() => setShowBirthdayMessage(true), 1500)
    setTimeout(() => setShowCertificate(true), 4000)
  }

  if (!mounted) return null

  return (
    <section ref={sectionRef} className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soft-pink via-hot-pink/20 to-rose/30" />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.2) 0%, transparent 40%)',
            'radial-gradient(circle at 80% 80%, rgba(255, 105, 180, 0.2) 0%, transparent 40%)',
            'radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.2) 0%, transparent 40%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-7xl mb-6"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎁
          </motion.div>
          
          <h2 className="font-great text-5xl md:text-7xl gradient-text mb-4">
            One Last Thing...
          </h2>
          
          <p className="text-pink-600 font-dancing text-xl">
            Ready for the grand finale?
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showSurprise ? (
            <motion.div
              key="button"
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <motion.button
                onClick={triggerFireworks}
                className="relative px-12 py-6 bg-gradient-to-r from-hot-pink via-rose to-hot-pink text-white text-2xl font-dancing rounded-full shadow-2xl overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 105, 180, 0.5)',
                    '0 0 40px rgba(255, 105, 180, 0.8)',
                    '0 0 20px rgba(255, 105, 180, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative z-10">
                  🎂 Tap For Your Birthday Surprise 🎂
                </span>
              </motion.button>

              <motion.p
                className="mt-8 text-pink-500 text-lg font-dancing"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Go ahead, you know you want to... 💕
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="surprise"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {showBirthdayMessage && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', duration: 1 }}
                >
                  <motion.div
                    className="text-8xl md:text-9xl mb-6"
                    animate={{ 
                      scale: [1, 1.3],
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 1.5 }}
                  >
                    🎉
                  </motion.div>
                  
                  <motion.h3 
                    className="font-great text-4xl md:text-7xl text-white drop-shadow-lg mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    HAPPY BIRTHDAY
                  </motion.h3>
                  
                  <motion.h2
                    className="font-great text-5xl md:text-8xl gradient-text mb-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                  >
                    MY LOVE SABRIIN!
                  </motion.h2>
                  
                  <motion.div
                    className="flex justify-center gap-4 text-6xl md:text-8xl mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.span animate={{ y: [0, -20, 0] }} transition={{ duration: 0.5, delay: 1 }}>🎂</motion.span>
                    <motion.span animate={{ y: [0, -20, 0] }} transition={{ duration: 0.5, delay: 1.1 }}>🎈</motion.span>
                    <motion.span animate={{ y: [0, -20, 0] }} transition={{ duration: 0.5, delay: 1.2 }}>🎁</motion.span>
                    <motion.span animate={{ y: [0, -20, 0] }} transition={{ duration: 0.5, delay: 1.3 }}>🥳</motion.span>
                    <motion.span animate={{ y: [0, -20, 0] }} transition={{ duration: 0.5, delay: 1.4 }}>💖</motion.span>
                  </motion.div>

                  <motion.div
                    className="glass-effect rounded-3xl p-6 md:p-8 max-w-2xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <motion.h4
                      className="font-great text-3xl md:text-5xl text-pink-600 mb-4"
                      animate={{ scale: [1, 1.05] }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      HAPPY 18! 🔥
                    </motion.h4>
                    <motion.p
                      className="font-dancing text-xl md:text-2xl text-pink-700 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      You're officially an adult now...
                    </motion.p>
                    <motion.p
                      className="font-dancing text-2xl md:text-3xl text-rose font-bold"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.5, type: 'spring' }}
                    >
                      But stay away from vodka! 🍸❌
                    </motion.p>
                    <motion.p
                      className="font-dancing text-lg text-pink-500 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 }}
                    >
                      (I mean it... I need you sober so you can remember how much I love you 😏)
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}

              <motion.div
                className="love-letter mx-auto max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5 }}
              >
                <p className="text-xl md:text-2xl text-pink-700 leading-relaxed text-center">
                  {finalMessage}
                </p>
              </motion.div>

              {showCertificate && (
                <motion.div
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1, type: 'spring' }}
                >
                  <LoveCertificate
                    title={certificate.title}
                    awardedTo={certificate.awardedTo}
                    forText={certificate.for}
                    signedBy={certificate.signedBy}
                  />
                </motion.div>
              )}

              <motion.div
                className="text-center pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
              >
                <motion.p
                  className="font-great text-3xl md:text-5xl text-white drop-shadow-lg"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    textShadow: [
                      '0 0 20px rgba(255, 105, 180, 0.5)',
                      '0 0 40px rgba(255, 105, 180, 0.8)',
                      '0 0 20px rgba(255, 105, 180, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  I Love You Forever & Always ❤️
                </motion.p>
                <motion.p
                  className="font-dancing text-xl text-pink-300 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 6 }}
                >
                  - Your Man
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose/50 to-transparent" />
    </section>
  )
}
