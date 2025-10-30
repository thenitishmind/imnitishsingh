"use client";

import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-900 tech-grid-bg relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full animate-pulse"></div>

      <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center surface-glass holographic-border rounded-full px-6 py-2 mb-6"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-cyan-400 font-medium text-sm neon-text">Let&apos;s Connect</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 neon-text">
            Get In Touch
          </h1>
          
          <motion.div
            variants={itemVariants}
            className="w-32 h-2 modern-gradient mx-auto mb-8 rounded-full shadow-lg animate-gradient-shift"
          />
          
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <div className="surface-glass holographic-border rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-8 neon-text">Contact Information</h3>
                
                <motion.div variants={itemVariants} className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 modern-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 neon-text">Email</h4>
                      <p className="text-slate-300 font-medium">contact@nitishsingh.dev</p>
                    </div>
                  </div>


                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 modern-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Location</h4>
                      <p className="text-gray-300">India</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Response Time</h4>
                      <p className="text-gray-300">Within 24 hours</p>
                    </div>
                  </div>
                </motion.div>

                {/* Signature Section */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 pt-8 border-t border-gray-700/50"
                >
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2" style={{fontFamily: 'Brush Script MT, cursive'}}>
                        Nitish Singh
                      </div>
                      <div className="text-gray-400 text-sm font-medium tracking-wide">
                        Full Stack Developer
                      </div>
                    </div>
                    <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-300 text-sm italic">
                      &quot;Building digital experiences with passion and precision&quot;
                    </p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

