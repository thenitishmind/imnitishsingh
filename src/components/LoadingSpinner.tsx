"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({ size = "medium", text, fullScreen = false }: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  };

  const containerClass = fullScreen
    ? "fixed inset-0 flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="relative">
        {/* Outer rotating ring */}
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-700`}
          style={{
            borderTopColor: "#3b82f6",
            borderRightColor: "#8b5cf6",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Inner pulsing circle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.div>
      </div>

      {text && (
        <motion.p
          className="mt-4 text-gray-300 text-sm font-medium"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>
      )}

      {fullScreen && (
        <motion.div
          className="mt-6 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                y: [-8, 8, -8],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
