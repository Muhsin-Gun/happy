'use client'

import { useState } from 'react'
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showWrong, setShowWrong] = useState(false)
  const [showRealAnswer, setShowRealAnswer] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setIsShaking(true)
    setShowWrong(true)

    setTimeout(() => {
      setIsShaking(false)
    }, 500)

    setTimeout(() => {
      setShowWrong(false)
      setShowRealAnswer(true)
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF69B4', '#FFD700', '#FF1493']
      })
    }, 1500)

    setTimeout(() => {
      setShowRealAnswer(false)
      setSelectedAnswer(null)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FF69B4', '#FFD700', '#FF1493', '#FFC0CB']
        })
        setTimeout(onComplete, 1000)
      }
    }, 4000)
  }

  const question = questions[currentQuestion]

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
          Time to Play!
        </h2>
        
        <p className="text-center text-pink-600 mb-8">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <motion.div
          className="glass-effect rounded-3xl p-8 md:p-12"
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          <h3 className="font-dancing text-2xl md:text-3xl text-center text-pink-700 mb-8">
            {question.question}
          </h3>

          <AnimatePresence mode="wait">
            {!showRealAnswer ? (
              <motion.div
                key="options"
                className="space-y-4"
                exit={{ opacity: 0 }}
              >
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`quiz-option w-full text-left ${
                      selectedAnswer === index && showWrong ? 'wrong-answer' : ''
                    }`}
                    onClick={() => selectedAnswer === null && handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {option}
                  </motion.button>
                ))}
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
                  className="text-6xl mb-6"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  ❤️
                </motion.div>
                <p className="font-dancing text-2xl md:text-3xl text-pink-600">
                  {question.realAnswer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {showWrong && !showRealAnswer && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-9xl text-red-500"
                animate={{ rotate: [0, -20, 20, 0] }}
                transition={{ duration: 0.3, repeat: 2 }}
              >
                ❌
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="flex justify-center mt-8 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {questions.map((_, index) => (
            <div
              key={index}
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
