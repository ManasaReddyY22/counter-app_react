import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentUser, logoutUser } from '../utils/auth';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  useEffect(() => {
    if (count > 0) {
      setShowConfetti(true);
      setConfetti(randomConfetti(12));
      const timer = setTimeout(() => setShowConfetti(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
        style={{
          width: '100%',
          maxWidth: '32rem',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Main Counter Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full border border-white/20 relative"
          style={{ 
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            padding: '3rem',
            margin: '2rem',
            minWidth: '400px',
            maxWidth: '500px'
          }}
        >
          {/* Header with user info and logout */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/20">
              <span className="text-gray-700 text-sm font-medium">
                Welcome, <span className="text-purple-600 font-semibold">{user.username}</span> ✨
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 px-3 py-2 rounded-xl font-medium shadow-lg hover:from-pink-300 hover:to-purple-300 transition-all duration-300 border border-white/20 text-sm"
            >
              Logout
            </motion.button>
          </motion.div>
                      <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <h1 className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Counter App ✨
                </h1>
                <p className="text-gray-500 text-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Count your moments</p>
              </motion.div>

              {/* Count Display */}
              <motion.div
                key={count}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-100 shadow-lg"
                style={{
                  padding: '2.5rem',
                  margin: '1.5rem 0'
                }}
              >
                                  <div className="text-7xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, letterSpacing: '-0.05em' }}>
                    {count}
                  </div>
              </motion.div>

              {/* Buttons */}
              <div className="grid grid-cols-3 gap-6 mb-8" style={{ margin: '2rem 0' }}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={decrement}
                  className="bg-gradient-to-r from-pink-200 to-pink-300 text-gray-700 rounded-2xl font-semibold text-xl shadow-lg hover:from-pink-300 hover:to-pink-400 transition-all duration-300 border border-pink-200"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '1.25rem',
                    minWidth: '80px'
                  }}
                >
                  ➖
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  className="bg-gradient-to-r from-blue-200 to-blue-300 text-gray-700 rounded-2xl font-semibold text-xl shadow-lg hover:from-blue-300 hover:to-blue-400 transition-all duration-300 border border-blue-200"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '1.25rem',
                    minWidth: '80px'
                  }}
                >
                  🔄
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={increment}
                  className="bg-gradient-to-r from-purple-200 to-purple-300 text-gray-700 rounded-2xl font-semibold text-xl shadow-lg hover:from-purple-300 hover:to-purple-400 transition-all duration-300 border border-purple-200"
                  style={{
                    padding: '1rem 1.5rem',
                    fontSize: '1.25rem',
                    minWidth: '80px'
                  }}
                >
                  ➕
                </motion.button>
              </div>

              {/* Button Labels */}
              <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 font-medium">
                <div className="text-center">Decrease</div>
                <div className="text-center">Reset</div>
                <div className="text-center">Increase</div>
              </div>

              {/* Fun Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-white/20">
                  <p className="text-gray-700 font-medium text-sm">
                    {count === 0 && "Let's start counting! 🚀"}
                    {count > 0 && count < 10 && "Great start! Keep going! ✨"}
                    {count >= 10 && count < 50 && "You're doing amazing! 🌟"}
                    {count >= 50 && count < 100 && "Incredible progress! 🎉"}
                    {count >= 100 && "Legendary! You're a master! 👑"}
                    {count < 0 && "Negative numbers are cool too! 😊"}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        {/* Subtle Confetti Effect */}
        <AnimatePresence>
          {showConfetti && confetti.map(c => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, 30, -20, 0] }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1, delay: c.delay }}
              style={{
                position: 'fixed',
                left: c.left,
                top: c.top,
                width: c.size,
                height: c.size,
                background: c.color,
                borderRadius: '50%',
                zIndex: 50,
                pointerEvents: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Confetti colors and generation function
const confettiColors = [
  '#fbbf24', '#f87171', '#a78bfa', '#60a5fa', '#34d399', '#f472b6'
];

function randomConfetti(count = 12) {
  return Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100 + 'vw',
    top: Math.random() * 100 + 'vh',
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: Math.random() * 12 + 6,
    delay: Math.random() * 0.8,
    key: i + '-' + Math.random()
  }));
}

export default Counter; 