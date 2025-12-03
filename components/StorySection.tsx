'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface StorySectionProps {
  title: string
  paragraphs: string[]
}

export default function StorySection({ title, paragraphs }: StorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section 
      ref={containerRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-lavender-blush to-pink-50" />
        
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255, 105, 180, 0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📖
          </motion.div>
          <h2 className="font-great text-5xl md:text-7xl gradient-text">
            {title}
          </h2>
        </motion.div>

        <div className="space-y-12">
          {paragraphs.map((paragraph, index) => (
            <StoryParagraph key={index} text={paragraph} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-4xl">💕</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StoryParagraph({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`flex ${isEven ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div 
        className={`love-letter max-w-xl ${isEven ? 'mr-8 md:mr-16' : 'ml-8 md:ml-16'}`}
      >
        <motion.p
          className="text-xl md:text-2xl text-pink-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {text}
        </motion.p>
        
        <motion.div
          className="absolute -bottom-4 right-4 text-2xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {['🌸', '💝', '✨', '🦋', '💗', '🌹', '💫'][index % 7]}
        </motion.div>
      </div>
    </motion.div>
  )
}
