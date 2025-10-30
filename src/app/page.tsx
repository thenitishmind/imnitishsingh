"use client"; // Required for framer-motion components

import Hero from "@/components/Hero";
import ImageSlider from "@/components/ImageSlider";
import ProjectsSection from "@/components/ProjectsSection";
import Testimonials from "@/components/Testimonials";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2, // Stagger children animations if any
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="bg-slate-900 min-h-screen overflow-x-hidden relative tech-grid-bg">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/5 to-pink-900/8 pointer-events-none" />
      
      <Hero />
      
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div variants={childVariants} className="text-center mb-16">
          <motion.div
            variants={childVariants}
            className="inline-flex items-center surface-glass holographic-border rounded-full px-6 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-cyan-400 font-medium text-sm neon-text">Curated Android, React & Next.js</span>
          </motion.div>
          
          <motion.h2 
            variants={childVariants} 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 gradient-text leading-tight"
          >
            Featured Work
          </motion.h2>
          
          <motion.div
            variants={childVariants}
            className="w-32 h-2 modern-gradient mx-auto mb-8 rounded-full shadow-lg animate-gradient-shift"
          />
          
          <motion.p 
            variants={childVariants} 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            Explore selected Android and React/Next.js projects, curated for clarity and impact.
          </motion.p>
          
          <motion.div
            variants={childVariants}
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
          >
            <div className="flex items-center surface-glass rounded-full px-4 py-2 border border-slate-700/30">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
              Android + React/Next.js Projects
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={childVariants}
          className="relative"
        >
          <ImageSlider />
          
          
        </motion.div>
      </motion.section>
      
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10"
      >
        <ProjectsSection />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10"
      >
        <Testimonials />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/5 rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ 
          y: [20, -20, 20],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-500/5 rounded-full pointer-events-none"
      />
    </div>
  );
}
