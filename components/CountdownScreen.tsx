'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

interface CountdownScreenProps {
  targetDate: string
  onComplete: () => void
  onPadlockClick?: () => void
}

interface Star {
  id: number
  left: number
  top: number
  size: number
  opacity: number
  duration: number
}

export default function CountdownScreen({ targetDate, onComplete, onPadlockClick }: CountdownScreenProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isComplete, setIsComplete] = useState(false)
  const [stars, setStars] = useState<Star[]>([])
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      duration: Math.random() * 3 + 2
    }))
    setStars(generatedStars)
  }, [])

  useEffect(() => {
    const target = new Date(targetDate).getTime()
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isComplete: false
      }
    }

    // Calculate immediately on mount
    const initial = calculateTimeLeft()
    if (initial.isComplete) {
      setIsComplete(true)
      setTimeout(onComplete, 3000)
      return
    }
    setTimeLeft({
      days: initial.days,
      hours: initial.hours,
      minutes: initial.minutes,
      seconds: initial.seconds
    })

    const timer = setInterval(() => {
      const result = calculateTimeLeft()
      
      if (result.isComplete) {
        clearInterval(timer)
        setIsComplete(true)
        setTimeout(onComplete, 3000)
        return
      }

      setTimeLeft({
        days: result.days,
        hours: result.hours,
        minutes: result.minutes,
        seconds: result.seconds
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onComplete])

  useEffect(() => {
    if (starsRef.current && mounted) {
      const starElements = starsRef.current.children
      gsap.to(starElements, {
        opacity: 0.3,
        scale: 0.5,
        duration: 2,
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true
        }
      })
    }
  }, [mounted, stars])

  const handlePadlockClick = () => {
    if (onPadlockClick) {
      onPadlockClick()
    }
  }

  if (!mounted) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        }}
      >
        <div className="text-white text-2xl font-dancing">Loading your surprise...</div>
      </div>
    )
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.5 }}
      transition={{ duration: 1.5 }}
    >
      <div ref={starsRef} className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle ${star.duration}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(255, 105, 180, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(255, 105, 180, 0.3) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key="countdown"
            className="text-center z-10 px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-6xl md:text-8xl mb-4 cursor-pointer select-none"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={handlePadlockClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Click to unlock early"
            >
              🔒
            </motion.div>
            
            <h1 className="font-dancing text-4xl md:text-6xl text-white mb-4">
              Something Special is Coming...
            </h1>
            
            <p className="text-pink-300 text-xl md:text-2xl mb-8 font-light">
              You can't open this until your special day, my love...
            </p>

            <div className="flex gap-4 md:gap-8 justify-center flex-wrap">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hours' },
                { value: timeLeft.minutes, label: 'Minutes' },
                { value: timeLeft.seconds, label: 'Seconds' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="glass-effect rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-4xl md:text-6xl font-bold text-white block">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-pink-300 text-sm md:text-base">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="mt-12 text-pink-200 text-lg font-dancing"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Patience, my love... the best is yet to come
            </motion.p>

            <motion.p
              className="mt-4 text-pink-400/60 text-sm font-light cursor-pointer"
              onClick={handlePadlockClick}
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0.4 }}
            >
              {/* (Psst... try clicking the padlock) */}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <motion.div
              className="text-8xl md:text-9xl mb-8"
              animate={{ 
                rotate: [0, -30, 30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1 }}
            >
              🔓
            </motion.div>
            
            <motion.h1
              className="font-great text-5xl md:text-8xl text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              It's Time!
            </motion.h1>
            
            <motion.p
              className="text-pink-300 text-2xl mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Welcome to your special surprise...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-500/20 to-transparent" />
    </motion.div>
  )
}
