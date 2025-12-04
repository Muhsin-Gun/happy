// components/QuizSection.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * QuizSection
 * - Has multiple questions (includes your example).
 * - Wrong answers produce a dramatic X animation + shake.
 * - After a few wrong attempts, reveal the "real" answer with a cute message.
 */

type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  revealText?: string; // custom reveal message
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    question: "What do I love about you?",
    options: ["Your lips", "Your neck", "Your smile", "Everything about you"],
    correctIndex: 3,
    revealText: "Everything about you — every little thing.",
  },
  {
    id: "q2",
    question: "If I could plan the perfect quick getaway with you, which would I secretly pick?",
    options: ["A cozy mountainside cabin", "A seaside sunrise with pancakes", "A spontaneous road trip with no plan", "A city museum hop and coffee crawl"],
    correctIndex: 2,
    revealText: "A spontaneous road trip — because any place is perfect with you.",
  },
  {
    id: "q3",
    question: "Which odd little habit of yours makes me melt the most?",
    options: ["When you tuck hair behind your ear", "When you laugh at my worst jokes", "When you make that thinking face", "When you sing in the shower"],
    correctIndex: 1,
    revealText: "Your laugh at my worst jokes — it's my favourite sound.",
  },
  {
    id: "q4",
    question: "If I could gift you one silly superpower for our dates, what would I pick?",
    options: ["Teleportation (skip traffic!)", "Unlimited coffee refills", "Perfect weather control", "A pause button for cozy moments"],
    correctIndex: 3,
    revealText: "A pause button — so our best moments never end.",
  },
];

export default function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState<Record<string, number>>({});
  const [showX, setShowX] = useState(false);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [lastWrongId, setLastWrongId] = useState<string | null>(null);

  const q = QUESTIONS[current];

  function handleOptionChoose(idx: number) {
    const id = q.id;
    if (reveal[id]) return; // already revealed

    if (idx === q.correctIndex) {
      // correct
      setReveal((r) => ({ ...r, [id]: true }));
      setShowX(false);
      // short delay then next question (if any)
      setTimeout(() => {
        if (current < QUESTIONS.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          // finished - keep reveal on last
        }
      }, 1200);
    } else {
      // wrong
      setLastWrongId(id);
      setShowX(true);
      setWrongAttempts((prev) => {
        const next = { ...prev, [id]: (prev[id] || 0) + 1 };
        // if attempts reach 2 (or more), reveal correct answer with explanation
        if ((next[id] || 0) >= 2) {
          setTimeout(() => {
            setReveal((r) => ({ ...r, [id]: true }));
            setShowX(false);
          }, 850);
        } else {
          // hide X after short time
          setTimeout(() => setShowX(false), 850);
        }
        return next;
      });
    }
  }

  return (
    <section className="quiz-section" aria-live="polite">
      <div className="quiz-card" data-question-id={q.id}>
        <h2 className="quiz-title">Question {current + 1} of {QUESTIONS.length}</h2>

        <motion.h3
          key={q.id + "-q"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="quiz-question"
        >
          {q.question}
        </motion.h3>

        <div className="options">
          {q.options.map((opt, i) => {
            const disabled = !!reveal[q.id];
            return (
              <motion.button
                key={opt}
                className="option-btn"
                onClick={() => !disabled && handleOptionChoose(i)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                aria-disabled={disabled}
              >
                <span className="opt-label">{String.fromCharCode(65 + i)}</span>
                <span className="opt-text">{opt}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Wrong X overlay */}
        <div className={`x-overlay ${showX && lastWrongId === q.id ? "visible" : ""}`}>
          <motion.div
            key={`x-${q.id}-${wrongAttempts[q.id] || 0}`}
            initial={{ scale: 0.7, rotate: -10, opacity: 0 }}
            animate={{ scale: 1.12, rotate: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 700, damping: 20 }}
            className="x-badge"
          >
            ❌
          </motion.div>
        </div>

        {/* Reveal / message */}
        {reveal[q.id] && (
          <motion.div
            className="reveal-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="reveal-text">{q.revealText ?? "The real answer is… everything about you."}</p>
            <div className="reveal-cta">
              {current < QUESTIONS.length - 1 ? (
                <button className="next-btn" onClick={() => { setCurrent((c) => c + 1); }}>
                  Next question →
                </button>
              ) : (
                <button className="next-btn" onClick={() => { /* maybe open final surprise */ }}>
                  Finish ❤️
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .quiz-section {
          display: flex;
          justify-content: center;
          padding: 28px 16px;
        }
        .quiz-card {
          width: 100%;
          max-width: 880px;
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,249,250,0.9));
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          position: relative;
          overflow: hidden;
        }
        .quiz-title{
          margin:0 0 8px 0;
          font-weight:600;
          color:#FF4FA3;
        }
        .quiz-question{
          margin:0 0 16px 0;
          font-size:1.2rem;
        }
        .options{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap:12px;
          margin-bottom:12px;
        }
        .option-btn{
          display:flex;
          align-items:center;
          gap:12px;
          padding:12px;
          border-radius:10px;
          border:1px solid rgba(0,0,0,0.06);
          background:#fff;
          cursor:pointer;
          font-size:0.98rem;
          box-shadow: 0 3px 10px rgba(0,0,0,0.04);
        }
        .option-btn[aria-disabled="true"]{
          opacity:0.6;
          cursor:default;
        }
        .opt-label{
          min-width:28px;
          height:28px;
          border-radius:8px;
          background:linear-gradient(180deg,#fff,#ffeef7);
          display:flex;
          align-items:center;
          justify-content:center;
          font-weight:700;
          color:#ff2d8a;
        }
        .x-overlay{
          position:absolute;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:center;
          pointer-events:none;
          opacity:0;
          transition: opacity 160ms ease;
        }
        .x-overlay.visible{
          opacity:1;
        }
        .x-badge{
          font-size:84px;
          filter: drop-shadow(0 8px 20px rgba(255,20,100,0.18));
        }
        .reveal-box{
          margin-top:12px;
          padding:12px;
          border-radius:10px;
          background:linear-gradient(90deg,#fff0f6,#fff8fb);
          border:1px solid rgba(255,105,180,0.12);
        }
        .reveal-text{
          margin:0;
          font-weight:600;
          color:#b00066;
        }
        .next-btn{
          margin-top:10px;
          background:#ff69b4;
          color:#fff;
          border:none;
          font-weight:700;
          padding:8px 14px;
          border-radius:10px;
          cursor:pointer;
        }
      `}</style>
    </section>
  );
}
