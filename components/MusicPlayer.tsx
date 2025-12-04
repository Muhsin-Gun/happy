'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ROMANTIC_MUSIC_URL = 'https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(ROMANTIC_MUSIC_URL)
    audioRef.current.loop = true
    audioRef.current.volume = 0.25
    audioRef.current.preload = 'auto'
    
    audioRef.current.addEventListener('canplaythrough', () => {
      setIsLoaded(true)
    })

    audioRef.current.addEventListener('error', () => {
      setIsLoaded(true)
    })

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 5000)

    return () => {
      clearTimeout(tooltipTimer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
      })
    }
    setIsPlaying(!isPlaying)
    setShowTooltip(false)
  }

  if (!isLoaded) return null

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      {showTooltip && (
        <motion.div
          className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-sm text-pink-600 px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          Tap for romantic music 🎵
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white/90 transform rotate-45" />
        </motion.div>
      )}
      
      <motion.button
        className="music-toggle relative"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          className="text-2xl"
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
        >
          {isPlaying ? '🎵' : '🔇'}
        </motion.span>
        
        {isPlaying && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  )
}
