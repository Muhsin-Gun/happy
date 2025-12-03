'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Photo {
  id: number
  caption: string
  placeholder: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-soft-pink via-light-pink to-lavender-blush" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📸
          </motion.div>
          <h2 className="font-great text-5xl md:text-7xl gradient-text mb-4">
            Our Memories
          </h2>
          <p className="text-pink-600 font-dancing text-xl">
            Every moment with you is a treasure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="polaroid cursor-pointer"
              style={{ rotate: (index % 2 === 0 ? -3 : 3) + 'deg' }}
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: (index % 2 === 0 ? -3 : 3) }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-hot-pink/20 to-rose/20"
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <div className="text-center p-4 z-10">
                  <motion.div
                    className="text-5xl mb-2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🖼️
                  </motion.div>
                  <p className="text-pink-500 font-poppins text-sm">
                    {photo.placeholder}
                  </p>
                </div>

                <motion.div
                  className="absolute inset-0 border-4 border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              
              <p className="font-dancing text-xl text-center text-pink-700 mt-4">
                {photo.caption}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center mt-12 text-pink-500 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ✨ Click to add your own photos here ✨
        </motion.p>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="polaroid max-w-lg w-full"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <motion.div
                    className="text-8xl mb-4"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💝
                  </motion.div>
                  <p className="text-pink-500 font-poppins">
                    {selectedPhoto.placeholder}
                  </p>
                </div>
              </div>
              
              <p className="font-dancing text-2xl text-center text-pink-700 mt-4">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
