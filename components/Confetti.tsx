'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  left: string;
  delay: number;
  duration: number;
  color: string;
}

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      delay: Math.random() * 0.3,
      duration: 2.5 + Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)] ?? '#FF6B6B',
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: 0,
            y: -10,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: window.innerHeight + 10,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
          style={{
            left: piece.left,
            top: '-10px',
            position: 'fixed',
          }}
          className="will-change-transform"
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: piece.color }}
          />
        </motion.div>
      ))}
    </div>
  );
}
