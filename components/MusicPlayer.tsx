'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SPOTIFY_TRACK_ID = '2eAvDnpXP5W0cVtiI0PUxV'

export default function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 6000)

    return () => clearTimeout(tooltipTimer)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      <AnimatePresence>
        {showTooltip && !isExpanded && (
          <motion.div
            className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-sm text-pink-600 px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap font-dancing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Tap for our song - Dandelions 🎵💕
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white/95 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center">
              <p className="font-dancing text-lg">Our Song 💕</p>
            </div>
            <iframe 
              src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator&theme=0`}
              width="300" 
              height="152" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="block"
            />
            <div className="p-2 text-center">
              <p className="text-xs text-pink-400 font-dancing">Press play to hear it 🎶</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        className="music-toggle relative w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg flex items-center justify-center"
        onClick={() => {
          setIsExpanded(!isExpanded)
          setShowTooltip(false)
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          className="text-2xl"
          animate={isExpanded ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isExpanded ? '🎵' : '🎶'}
        </motion.span>
        
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-[8px]">💕</span>
        </motion.div>
      </motion.button>
    </div>
  )
}
