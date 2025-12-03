# Sabriin's Birthday Surprise Website

## Overview
An epic, romantic, cinematic birthday surprise website for Sabriin. Features a countdown lock screen until her birthday, beautiful animations, interactive quizzes, love story sections, photo galleries, and many romantic surprises.

## Current State
The website is fully functional with all major features implemented:
- Countdown lock screen with twinkling stars (locks until birthday date)
- Cinematic landing page with letter-drop animation
- Interactive quiz with playful wrong answers and sweet reveals
- Story section with parallax effects
- Photo gallery with polaroid effects (placeholders for real photos)
- Multiple romantic sections and surprises
- Fireworks finale with love certificate

## Tech Stack
- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP, Framer Motion
- **Effects**: Canvas Confetti, Lottie React
- **Audio**: Howler.js (for music toggle)

## Project Structure
```
/app
  - layout.tsx         # Root layout
  - page.tsx          # Main page with all sections
  - globals.css       # Global styles and animations

/components
  - CountdownScreen.tsx    # Birthday countdown lock
  - LandingSection.tsx     # Cinematic landing
  - CurtainReveal.tsx      # Curtain animation
  - QuizSection.tsx        # Interactive quiz
  - StorySection.tsx       # Love story with parallax
  - PhotoGallery.tsx       # Polaroid photo gallery
  - ReasonsSection.tsx     # "Why I Love You" reasons
  - MessageBottle.tsx      # Interactive message in bottle
  - FloatingBalloons.tsx   # Animated balloons
  - HiddenLoveNotes.tsx    # Clickable hidden notes
  - HeartbeatLine.tsx      # Animated heartbeat
  - ComplimentTicker.tsx   # Scrolling compliments
  - InsideJokes.tsx        # Flip card jokes
  - PromiseJar.tsx         # Interactive promise jar
  - DreamTrips.tsx         # Dream destinations
  - FinaleSection.tsx      # Fireworks & certificate
  - LoveCertificate.tsx    # Love certificate
  - FloatingHearts.tsx     # Background hearts
  - HeartCursor.tsx        # Heart cursor trail
  - MusicPlayer.tsx        # Music toggle button

/data
  - content.ts        # All editable content (names, dates, messages)
```

## How to Customize
1. Edit `/data/content.ts` to change:
   - Her name (herName)
   - Birthday date (birthdayDate)
   - Story paragraphs
   - Quiz questions
   - Love reasons
   - Photo captions

2. Replace photo placeholders in `/public/images` with real photos

3. Add background music to `/public/audio`

## Development
- Port: 5000
- Command: `npm run dev`

## Deployment
Configured for Vercel deployment with static export.

## Testing Features
- "Skip to Preview" button on countdown screen to test full experience
- Reset button (🔄) to go back to countdown
