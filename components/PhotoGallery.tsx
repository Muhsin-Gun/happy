'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Photo = {
  id: number
  caption: string
  src: string
}

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  // Use the four images from public/attached_assets folder
  const photos: Photo[] = [
    { id: 1, caption: 'That smile 😊', src: '/attached_assets/WhatsApp Image 2025-12-04 at 21.28.40.jpeg' },
    { id: 2, caption: 'us UwU', src: '/attached_assets/WhatsApp Image 2025-12-04 at 21.27.52.jpeg' },
    { id: 3, caption: 'my beautifull baby 🌸', src: '/attached_assets/WhatsApp Image 2025-12-04 at 21.27.52.jpeg' },
    { id: 4, caption: ' 📸', src: '/attached_assets/WhatsApp Image 2025-12-04 at 21.27.51.jpeg' },
  ]

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="polaroid cursor-pointer overflow-hidden"
              style={{ rotate: (index % 2 === 0 ? -3 : 3) + 'deg' }}
              initial={{ opacity: 0, y: 50, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: (index % 2 === 0 ? -3 : 3) }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="aspect-square bg-pink-50 flex items-center justify-center relative overflow-hidden group">
                <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-hot-pink/20 to-rose/20"
                  animate={{ opacity: [0.2, 0.45, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

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
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center overflow-hidden">
                <img src={selectedPhoto.src} alt={selectedPhoto.caption} className="w-full h-full object-cover" />
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
