'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountdownScreen from '@/components/CountdownScreen'
import CurtainReveal from '@/components/CurtainReveal'
import LandingSection from '@/components/LandingSection'
import FloatingHearts from '@/components/FloatingHearts'
import HeartCursor from '@/components/HeartCursor'
import MusicPlayer from '@/components/MusicPlayer'
import QuizSection from '@/components/QuizSection'
import StorySection from '@/components/StorySection'
import PhotoGallery from '@/components/PhotoGallery'
import ReasonsSection from '@/components/ReasonsSection'
import MessageBottle from '@/components/MessageBottle'
import FloatingBalloons from '@/components/FloatingBalloons'
import HiddenLoveNotes from '@/components/HiddenLoveNotes'
import FinaleSection from '@/components/FinaleSection'
import HeartbeatLine from '@/components/HeartbeatLine'
import ComplimentTicker from '@/components/ComplimentTicker'
import InsideJokes from '@/components/InsideJokes'
import PromiseJar from '@/components/PromiseJar'
import DreamTrips from '@/components/DreamTrips'
import { birthdayConfig } from '@/data/content'

type PageState = 'countdown' | 'landing' | 'main'

export default function Home() {
  const [pageState, setPageState] = useState<PageState>('countdown')
  const [showCurtain, setShowCurtain] = useState(true)
  const [curtainOpening, setCurtainOpening] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const unlocked = localStorage.getItem('birthday_unlocked')
    if (unlocked === 'true') {
      setPageState('landing')
      setShowCurtain(false)
    }
  }, [])

  const handleCountdownComplete = useCallback(() => {
    localStorage.setItem('birthday_unlocked', 'true')
    setPageState('landing')
  }, [])

  const handlePadlockClick = useCallback(() => {
    localStorage.setItem('birthday_unlocked', 'true')
    setShowCurtain(false)
    setPageState('landing')
  }, [])

  const handleEnterSite = useCallback(() => {
    setCurtainOpening(true)
    setTimeout(() => {
      setShowCurtain(false)
      setPageState('main')
    }, 1200)
  }, [])

  const handleCurtainComplete = useCallback(() => {
    setShowCurtain(false)
  }, [])

  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lavender-blush to-soft-pink">
        <div className="text-center">
          <motion.div 
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            💕
          </motion.div>
          <p className="font-dancing text-2xl text-pink-600">Loading your surprise...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <HeartCursor />
      
      <AnimatePresence mode="wait">
        {pageState === 'countdown' && (
          <CountdownScreen 
            targetDate={birthdayConfig.birthdayDate}
            onComplete={handleCountdownComplete}
            onPadlockClick={handlePadlockClick}
          />
        )}

        {pageState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-0"
          >
            {showCurtain && (
              <CurtainReveal 
                isOpen={curtainOpening} 
                onComplete={handleCurtainComplete}
              />
            )}
            <LandingSection 
              name={birthdayConfig.herName}
              message={birthdayConfig.welcomeMessage}
              subtitle={birthdayConfig.subtitle}
              onEnter={handleEnterSite}
            />
          </motion.div>
        )}

        {pageState === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <FloatingHearts />
            <MusicPlayer />

            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-lavender-blush via-light-pink to-soft-pink" />
              <motion.div
                className="text-center relative z-10 px-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="text-8xl mb-8"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎉
                </motion.div>
                <h1 className="font-great text-5xl md:text-8xl gradient-text mb-6">
                  Welcome, Baby!
                </h1>
                <p className="font-dancing text-2xl md:text-4xl text-pink-600 mb-8">
                  Scroll down to see what I made for you...
                </p>
                <motion.div
                  className="text-4xl"
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  👇
                </motion.div>
              </motion.div>
            </section>

            <ComplimentTicker />

            <StorySection 
              title={birthdayConfig.storyTitle}
              paragraphs={birthdayConfig.storyParagraphs}
            />

            <HeartbeatLine name={birthdayConfig.herName} />

            <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-soft-pink to-lavender-blush">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  className="text-6xl mb-6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring' }}
                >
                  🎮
                </motion.div>
                <motion.h2
                  className="font-great text-4xl md:text-6xl gradient-text mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Time For a Little Game
                </motion.h2>
                <motion.p
                  className="font-dancing text-xl text-pink-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Try to answer these... but there's a catch
                </motion.p>
              </div>
            </section>

            {!quizComplete ? (
              <QuizSection 
                questions={birthdayConfig.quizQuestions}
                onComplete={() => setQuizComplete(true)}
              />
            ) : (
              <motion.div
                className="py-20 text-center bg-gradient-to-b from-lavender-blush to-soft-pink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="text-8xl mb-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2 }}
                >
                  🏆
                </motion.div>
                <h3 className="font-great text-4xl gradient-text">
                  Quiz Complete!
                </h3>
                <p className="font-dancing text-xl text-pink-600 mt-4">
                  See? It was always you
                </p>
              </motion.div>
            )}

            <PhotoGallery />

            <InsideJokes />

            <ReasonsSection reasons={birthdayConfig.reasonsILoveYou} />

            <MessageBottle 
              message="Hey baby... I just wanted to say that meeting you was the best thing that ever happened to me. Every day with you feels like a gift. You're not just my girlfriend, you're my best friend, my favorite person, my everything. I love you more than I can ever put into words."
            />

            <PromiseJar />

            <FloatingBalloons name={birthdayConfig.herName} />

            <DreamTrips />

            <HiddenLoveNotes />

            <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-soft-pink via-hot-pink/20 to-lavender-blush">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  className="glass-effect rounded-3xl p-8 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💭
                  </motion.div>
                  <h3 className="font-great text-3xl md:text-5xl gradient-text mb-6">
                    My Promise To You
                  </h3>
                  <p className="font-dancing text-xl md:text-2xl text-pink-700 leading-relaxed">
                    I promise to love you every single day. To make you laugh when you're sad, 
                    to hold you when you need it, to be your biggest fan, and to never let you 
                    forget how amazing you are. You're stuck with me now... and I wouldn't have it 
                    any other way.
                  </p>
                  <motion.div
                    className="mt-6 text-4xl"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💍
                  </motion.div>
                </motion.div>
              </div>
            </section>

            <FinaleSection 
              finalMessage={birthdayConfig.finalMessage}
              certificate={birthdayConfig.loveCertificate}
            />

            <footer className="py-12 text-center bg-gradient-to-b from-rose/30 to-hot-pink/50">
              <motion.p
                className="font-great text-2xl md:text-4xl text-white drop-shadow-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Made with all my love, just for you
              </motion.p>
              <motion.p
                className="font-dancing text-lg text-white/80 mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Happy 18th Birthday, {birthdayConfig.herName}! 🎂
              </motion.p>
              <motion.div
                className="mt-6 text-4xl"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎈🎉🎂🎁🎊
              </motion.div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
