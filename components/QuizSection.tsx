'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  realAnswer: string
}

interface QuizSectionProps {
  questions: QuizQuestion[]
  onComplete: () => void
}

export default function QuizSection({ questions, onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([])
  const [showRealAnswer, setShowRealAnswer] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [allWrongTried, setAllWrongTried] = useState(false)
  const [showFinalReveal, setShowFinalReveal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const question = questions[currentQuestion]
  const correctIndex = question.correctAnswer

  const handleAnswer = (index: number) => {
    if (wrongAttempts.includes(index)) return

    if (index === correctIndex) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FF69B4', '#FFD700', '#FF1493', '#FFC0CB', '#ff6b6b']
      })
      
      setShowRealAnswer(true)
      
      setTimeout(() => {
        setShowRealAnswer(false)
        setWrongAttempts([])
        setAllWrongTried(false)
        
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1)
        } else {
          setShowFinalReveal(true)
          const duration = 4000
          const animationEnd = Date.now() + duration
          
          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now()
            if (timeLeft <= 0) {
              clearInterval(interval)
              setTimeout(onComplete, 1000)
              return
            }
            
            confetti({
              particleCount: 50,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#FF69B4', '#FFD700', '#FF1493']
            })
            confetti({
              particleCount: 50,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#FF69B4', '#FFD700', '#FF1493']
            })
          }, 250)
        }
      }, 3500)
    } else {
      setIsShaking(true)
      setWrongAttempts(prev => [...prev, index])
      
      setTimeout(() => setIsShaking(false), 500)
      
      const newWrongAttempts = [...wrongAttempts, index]
      const allOthersTried = question.options.every((_, i) => 
        i === correctIndex || newWrongAttempts.includes(i)
      )
      
      if (allOthersTried) {
        setAllWrongTried(true)
      }
    }
  }

  if (!mounted) return null

  if (showFinalReveal) {
    return (
      <section className="min-h-screen py-20 px-4 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lavender-blush via-light-pink to-soft-pink" />
        <motion.div
          className="text-center z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1 }}
        >
          <motion.div
            className="text-9xl mb-8"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🏆
          </motion.div>
          <h2 className="font-great text-5xl md:text-7xl gradient-text mb-6">
            You Won!
          </h2>
          <p className="font-dancing text-2xl md:text-3xl text-pink-600 mb-4">
            But honestly... you already knew, didn't you?
          </p>
          <motion.p
            className="font-dancing text-xl text-pink-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            The answer was always you... and it always will be ❤️
          </motion.p>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="min-h-screen py-20 px-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-lavender-blush via-light-pink to-soft-pink opacity-50" />
      
      <motion.div
        className={`max-w-2xl w-full z-10 ${isShaking ? 'animate-shake' : ''}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.3 }}
        >
          <span className="text-6xl">🎮</span>
        </motion.div>

        <h2 className="font-great text-4xl md:text-6xl text-center gradient-text mb-4">
          Quick Quiz, Baby!
        </h2>
        
        <p className="text-center text-pink-600 mb-8 font-dancing text-lg">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <motion.div
          className="glass-effect rounded-3xl p-6 md:p-12"
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <h3 className="font-dancing text-xl md:text-3xl text-center text-pink-700 mb-8">
            {question.question}
          </h3>

          <AnimatePresence mode="wait">
            {!showRealAnswer ? (
              <motion.div
                key="options"
                className="space-y-3"
                exit={{ opacity: 0 }}
              >
                {question.options.map((option, index) => (
                  <motion.button
                    key={`${currentQuestion}-${index}`}
                    className={`quiz-option w-full text-left ${
                      wrongAttempts.includes(index) ? 'wrong-answer opacity-60' : ''
                    } ${
                      index === correctIndex && allWrongTried ? 'correct-answer animate-pulse' : ''
                    }`}
                    onClick={() => handleAnswer(index)}
                    disabled={wrongAttempts.includes(index) || showRealAnswer}
                    whileHover={!wrongAttempts.includes(index) ? { scale: 1.02 } : {}}
                    whileTap={!wrongAttempts.includes(index) ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-medium">{option}</span>
                    {wrongAttempts.includes(index) && (
                      <span className="ml-2">❌</span>
                    )}
                    {index === correctIndex && allWrongTried && (
                      <motion.span 
                        className="ml-2"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        👈 Tap me!
                      </motion.span>
                    )}
                  </motion.button>
                ))}
                
                {allWrongTried && (
                  <motion.p
                    className="text-center text-pink-600 font-dancing text-lg mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Hmm... maybe try the obvious one? 😏
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="answer"
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <motion.div
                  className="text-7xl mb-6"
                  animate={{ 
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1 }}
                >
                  💖
                </motion.div>
                <p className="font-dancing text-2xl md:text-3xl text-pink-600">
                  {question.realAnswer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex justify-center mt-8 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {questions.map((_, index) => (
            <div
              key={`progress-${index}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentQuestion
                  ? 'bg-hot-pink scale-125'
                  : index < currentQuestion
                  ? 'bg-pink-400'
                  : 'bg-pink-200'
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
