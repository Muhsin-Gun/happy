'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CurtainRevealProps {
  isOpen: boolean
  onComplete?: () => void
}

export default function CurtainReveal({ isOpen, onComplete }: CurtainRevealProps) {
  const [showCurtains, setShowCurtains] = useState(!isOpen)

  useEffect(() => {
    if (isOpen && showCurtains) {
      const timer = setTimeout(() => {
        setShowCurtains(false)
        onComplete?.()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, showCurtains, onComplete])

  // COMMENTED OUT FOR TESTING - CURTAIN COMPONENT DISABLED
  // return (
  //   <AnimatePresence mode="wait">
  //     {showCurtains && (
  //       <>
  //         <motion.div
  //           className="fixed top-0 left-0 w-1/2 h-screen bg-gradient-to-b from-pink-500 to-pink-600 z-50 flex items-center justify-center pointer-events-auto"
  //           initial={{ x: 0 }}
  //           animate={{ x: isOpen ? '-100%' : 0 }}
  //           exit={{ x: '-100%' }}
  //           transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
  //           onAnimationComplete={() => {
  //             if (isOpen) {
  //               setShowCurtains(false)
  //             }
  //           }}
  //         >
  //           <div className="text-white text-6xl">❤️</div>
  //           <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-400" />
  //         </motion.div>

  //         <motion.div
  //           className="fixed top-0 right-0 w-1/2 h-screen bg-gradient-to-b from-pink-500 to-pink-600 z-50 flex items-center justify-center pointer-events-auto"
  //           initial={{ x: 0 }}
  //           animate={{ x: isOpen ? '100%' : 0 }}
  //           exit={{ x: '100%' }}
  //           transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
  //           onAnimationComplete={() => {
  //             if (isOpen) {
  //               setShowCurtains(false)
  //             }
  //           }}
  //         >
  //           <div className="text-white text-6xl">❤️</div>
  //           <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400" />
  //         </motion.div>
  //       </>
  //     )}
  //   </AnimatePresence>
  // )

  // TESTING WITHOUT CURTAIN - RETURNS NULL
  return null
}
