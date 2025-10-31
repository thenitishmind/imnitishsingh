"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaCode, FaUserAlt, FaDownload } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Link from "next/link";

// Loading component inspired by the reference website
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-bold text-white"
        >
          Loading Resume...
        </motion.h2>
        <motion.div
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-1 bg-blue-500 rounded-full mt-4 mx-auto max-w-xs"
        />
      </div>
    </motion.div>
  );
};

export default function ResumePage() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Resume data
  const resumeData = {
    introduction: {
      title: "Introduction",
      icon: FaUserAlt,
      content: {
        name: "Nitish Singh",
        title: "Full Stack Developer",
        summary: "Passionate developer with 3+ years of experience building modern web applications and digital experiences that solve real-world problems. Specialized in React.js, Node.js, and cloud technologies with a strong focus on creating scalable, user-friendly solutions.",
        contact: {
          email: "devops@nitishsingh.dev",
          phone: "+91-XXXXXXXXXX",
          location: "Maharashtra, Pune, India",
          github: "https://github.com/thenitishmind",
          linkedin: "https://linkedin.com/in/nitishsingh"
        }
      }
    },
    education: {
      title: "Education",
      icon: FaGraduationCap,
      content: [
        {
          degree: "Bachelor of Computer Applications (BCA)",
          institution: "Glocal University",
          period: "2016 - 2019",
          cgpa: "7.70",
          details: "Specialized in Computer Science with focus on software development, data structures, and algorithms."
        },
        {
          degree: "12th Grade (Higher Secondary)",
          institution: "Science Stream",
          period: "2015 - 2016",
          percentage: "78%",
          details: "Focused on Physics, Chemistry, and Mathematics."
        },
        {
          degree: "10th Grade",
          institution: "Secondary Education",
          period: "2013 - 2014",
          percentage: "75%",
          details: "Core subjects including Mathematics and Science."
        }
      ]
    },
    experience: {
      title: "Experience",
      icon: FaBriefcase,
      content: [
        {
          title: "Full Stack Developer",
          company: "Bizloan Pvt Ltd",
          period: "Current Position",
          location: "Maharashtra, Pune",
          responsibilities: [
            "Developing and maintaining web applications for financial services",
            "Collaborating with cross-functional teams to deliver scalable solutions",
            "Implementing secure coding practices for financial data handling",
            "Optimizing application performance and user experience",
            "Working with React, Python, MySQL, MongoDB, and cloud technologies"
          ]
        },
        {
          title: "Freelance Web Developer",
          company: "Self-Employed",
          period: "2022 - Present (3 Years 10 Months)",
          location: "Remote",
          responsibilities: [
            "Designed and developed responsive websites using modern web technologies",
            "Built full-stack applications including e-commerce platforms and admin dashboards",
            "Managed client relationships and delivered projects on time",
            "Deployed applications using Netlify and Vercel",
            "Gained expertise in React.js, Node.js, MongoDB, and MySQL"
          ]
        }
      ]
    },
    skills: {
      title: "Skills",
      icon: FaCode,
      content: {
        technical: [
          { name: "JavaScript", level: 90 },
          { name: "HTML5/CSS3", level: 95 },
          { name: "React.js", level: 85 },
          { name: "Node.js", level: 80 },
          { name: "MongoDB", level: 75 },
          { name: "MySQL", level: 70 },
          { name: "Python", level: 65 },
          { name: "TypeScript", level: 75 },
          { name: "Git/GitHub", level: 85 },
          { name: "Responsive Design", level: 90 }
        ],
        frameworks: ["React.js", "Next.js", "Express.js", "Bootstrap", "Tailwind CSS"],
        cloud: ["AWS (Cloud Practitioner Certified)", "Azure (Fundamentals Certified)", "Docker"],
        tools: ["VS Code", "Postman", "Git/GitHub", "Netlify", "Vercel"]
      }
    },
    leetcode: {
      title: "LeetCode",
      icon: SiLeetcode,
      content: {
        profile: "https://leetcode.com/u/Itsnitishsingh/",
        description: "Active problem solver on LeetCode, continuously improving algorithmic thinking and data structure skills. Regular practice helps me stay sharp with coding challenges and technical interviews.",
        achievements: [
          "Solved 100+ problems across various difficulty levels",
          "Strong focus on data structures and algorithms",
          "Regular participation in weekly contests",
          "Expertise in dynamic programming, graphs, and tree problems"
        ]
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-slate-900 tech-grid-bg py-16 relative overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10 pointer-events-none" />
          <div className="absolute top-1/3 left-1/5 w-96 h-96 bg-cyan-500/5 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-purple-500/5 rounded-full animate-pulse" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-12"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center surface-glass holographic-border rounded-full px-6 py-2 mb-6"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-cyan-400 font-medium text-sm neon-text">Professional Profile</span>
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl font-bold text-white mb-6 neon-text"
              >
                Resume
              </motion.h1>
              
              <motion.div
                variants={itemVariants}
                className="w-32 h-2 modern-gradient mx-auto mb-8 rounded-full shadow-lg animate-gradient-shift"
              />
              
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed"
              >
                Comprehensive overview of my professional journey, skills, and achievements
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex justify-center gap-6"
              >
                <a
                  href="/Resume/Nitish RESUME.pdf"
                  download
                  className="inline-flex items-center modern-gradient text-white px-8 py-4 rounded-xl font-semibold hover:shadow-cyan-500/50 transition-all duration-300 shadow-lg neon-text"
                >
                  <FaDownload className="mr-2" /> Download PDF
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center surface-glass holographic-border text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800/50 transition-all duration-300"
                >
                  View About Page
                </Link>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Navigation Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="bg-gray-800 rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-semibold text-white mb-4">Sections</h3>
                  <nav className="space-y-2">
                    {Object.entries(resumeData).map(([key, section]) => {
                      const IconComponent = section.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveSection(key)}
                          className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition duration-300 ${
                            activeSection === key
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          <IconComponent className="mr-3 text-lg" />
                          {section.title}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </motion.div>

              {/* Content Area */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700"
                  >
                    {/* Introduction Section */}
                    {activeSection === "introduction" && (
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Introduction</h2>
                        <div className="space-y-6">
                          <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {resumeData.introduction.content.name}
                            </h3>
                            <p className="text-xl text-blue-400 mb-4">
                              {resumeData.introduction.content.title}
                            </p>
                            <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
                              {resumeData.introduction.content.summary}
                            </p>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                              <h4 className="text-lg font-semibold text-white mb-3">Contact Information</h4>
                              <div className="space-y-2 text-gray-300">
                                <p><strong>Email:</strong> {resumeData.introduction.content.contact.email}</p>
                                <p><strong>Location:</strong> {resumeData.introduction.content.contact.location}</p>
                                <p><strong>GitHub:</strong> 
                                  <a href={resumeData.introduction.content.contact.github} 
                                     target="_blank" 
                                     rel="noopener noreferrer"
                                     className="text-blue-400 hover:text-blue-300 ml-1">
                                    View Profile
                                  </a>
                                </p>
                              </div>
                            </div>
                            
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                              <h4 className="text-lg font-semibold text-white mb-3">Professional Focus</h4>
                              <ul className="text-gray-300 space-y-1">
                                <li>• Full Stack Development</li>
                                <li>• Modern Web Technologies</li>
                                <li>• Cloud Solutions</li>
                                <li>• User Experience Design</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Education Section */}
                    {activeSection === "education" && (
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Education</h2>
                        <div className="relative border-l-2 border-gray-600 pl-8 ml-4">
                          {resumeData.education.content.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="mb-8 relative"
                            >
                              <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-blue-600 border-4 border-gray-800 flex items-center justify-center">
                                <FaGraduationCap className="text-white text-xs" />
                              </div>
                              <div className="bg-gray-700/50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-white mb-2">{item.degree}</h3>
                                <p className="text-blue-400 mb-1">{item.institution}</p>
                                <p className="text-gray-400 text-sm mb-2">{item.period}</p>
                                {item.cgpa && (
                                  <p className="text-green-400 text-sm mb-2">CGPA: {item.cgpa}</p>
                                )}
                                {item.percentage && (
                                  <p className="text-green-400 text-sm mb-2">Score: {item.percentage}</p>
                                )}
                                <p className="text-gray-300">{item.details}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Experience Section */}
                    {activeSection === "experience" && (
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Professional Experience</h2>
                        <div className="relative border-l-2 border-gray-600 pl-8 ml-4">
                          {resumeData.experience.content.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="mb-8 relative"
                            >
                              <div className="absolute -left-10 mt-1.5 w-6 h-6 rounded-full bg-blue-600 border-4 border-gray-800 flex items-center justify-center">
                                <FaBriefcase className="text-white text-xs" />
                              </div>
                              <div className="bg-gray-700/50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                                <p className="text-blue-400 mb-1">{item.company}</p>
                                <p className="text-gray-400 text-sm mb-1">{item.period}</p>
                                <p className="text-gray-400 text-sm mb-4">{item.location}</p>
                                <ul className="text-gray-300 space-y-2">
                                  {item.responsibilities.map((resp, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-blue-400 mr-2 mt-1">•</span>
                                      {resp}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills Section */}
                    {activeSection === "skills" && (
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Skills & Expertise</h2>
                        <div className="space-y-8">
                          {/* Technical Skills */}
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {resumeData.skills.content.technical.map((skill, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: index * 0.05 }}
                                  className="bg-gray-700/50 p-4 rounded-lg"
                                >
                                  <div className="flex justify-between mb-2">
                                    <span className="text-white font-medium">{skill.name}</span>
                                    <span className="text-gray-400">{skill.level}%</span>
                                  </div>
                                  <div className="w-full bg-gray-600 rounded-full h-2">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${skill.level}%` }}
                                      transition={{ duration: 1, delay: index * 0.05 }}
                                      className="bg-blue-500 h-2 rounded-full"
                                    />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Frameworks & Libraries */}
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Frameworks & Libraries</h3>
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                              <div className="flex flex-wrap gap-2">
                                {resumeData.skills.content.frameworks.map((framework, index) => (
                                  <span
                                    key={index}
                                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                                  >
                                    {framework}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Cloud & DevOps */}
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Cloud & DevOps</h3>
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                              <div className="flex flex-wrap gap-2">
                                {resumeData.skills.content.cloud.map((tech, index) => (
                                  <span
                                    key={index}
                                    className="bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Tools */}
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Development Tools</h3>
                            <div className="bg-gray-700/50 p-4 rounded-lg">
                              <div className="flex flex-wrap gap-2">
                                {resumeData.skills.content.tools.map((tool, index) => (
                                  <span
                                    key={index}
                                    className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* LeetCode Section */}
                    {activeSection === "leetcode" && (
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-6">LeetCode Profile</h2>
                        <div className="space-y-6">
                          <div className="bg-gray-700/50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                              <SiLeetcode className="text-orange-500 text-3xl mr-4" />
                              <div>
                                <h3 className="text-xl font-semibold text-white">Competitive Programming</h3>
                                <p className="text-gray-400">Algorithm & Data Structure Practice</p>
                              </div>
                            </div>
                            <p className="text-gray-300 mb-6">
                              {resumeData.leetcode.content.description}
                            </p>
                            <a
                              href={resumeData.leetcode.content.profile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
                            >
                              <SiLeetcode className="mr-2" /> Visit LeetCode Profile
                            </a>
                          </div>

                          <div className="bg-gray-700/50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold text-white mb-4">Achievements & Focus Areas</h4>
                            <ul className="text-gray-300 space-y-2">
                              {resumeData.leetcode.content.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-orange-500 mr-2 mt-1">•</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
