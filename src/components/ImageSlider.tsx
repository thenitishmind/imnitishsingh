"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaCode, FaMobile, FaExternalLinkAlt, FaPython, FaJava, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaBrain, FaRocket } from "react-icons/fa";
import { SiTypescript, SiFlutter } from "react-icons/si";
import Link from "next/link";
import { Project } from "@/types";

interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  link: string;
  github?: string;
  tech: string[];
  gradient: string;
  icon: React.ReactNode;
  stats?: {
    stars?: number;
    views?: number;
    status?: string;
    forks?: number;
    lastUpdated?: string;
    language?: string;
  };
  isRealTime?: boolean;
  projectType?: string;
}

// Get appropriate icon based on language/tech
const getProjectIcon = (language: string | null, name: string) => {
  const iconProps = { size: 52, className: "text-white opacity-90" };
  
  if (language) {
    switch (language.toLowerCase()) {
      case 'typescript': return <SiTypescript {...iconProps} />;
      case 'javascript': return <FaJs {...iconProps} />;
      case 'python': return <FaPython {...iconProps} />;
      case 'java': return <FaJava {...iconProps} />;
      case 'html': return <FaHtml5 {...iconProps} />;
      case 'css': return <FaCss3Alt {...iconProps} />;
      case 'dart': return <SiFlutter {...iconProps} />;
      default: return <FaCode {...iconProps} />;
    }
  }
  
  if (name.toLowerCase().includes('database') || name.toLowerCase().includes('db')) {
    return <FaDatabase {...iconProps} />;
  }
  
  if (name.toLowerCase().includes('mobile') || name.toLowerCase().includes('app')) {
    return <FaMobile {...iconProps} />;
  }
  if (name.toLowerCase().includes('ai') || name.toLowerCase().includes('ml')) {
    return <FaBrain {...iconProps} />;
  }
  
  return <FaRocket {...iconProps} />;
};

// Generate gradient based on language/project type
const getProjectGradient = (language: string | null, index: number) => {
  const gradients = [
    "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800",
    "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700", 
    "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
    "bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800",
    "bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700",
    "bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700",
    "bg-gradient-to-br from-yellow-500 via-orange-600 to-red-700",
    "bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-700",
    "bg-gradient-to-br from-purple-500 via-violet-600 to-fuchsia-700",
    "bg-gradient-to-br from-slate-600 via-gray-700 to-zinc-800"
  ];
  
  if (language) {
    switch (language.toLowerCase()) {
      case 'typescript': return "bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800";
      case 'javascript': return "bg-gradient-to-br from-yellow-500 via-orange-600 to-red-600";
      case 'python': return "bg-gradient-to-br from-green-500 via-blue-600 to-indigo-700";
      case 'java': return "bg-gradient-to-br from-orange-600 via-red-600 to-pink-700";
      case 'dart': return "bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700";
      case 'css': return "bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700";
      default: return gradients[index % gradients.length];
    }
  }
  
  return gradients[index % gradients.length];
};

// Get project type based on language and name
const getProjectType = (language: string | null, name: string): string => {
  const nameLower = name.toLowerCase();
  
  if (language) {
    switch (language.toLowerCase()) {
      case 'java':
      case 'kotlin':
        if (nameLower.includes('android')) return 'Android App';
        return 'Java Application';
      case 'javascript':
      case 'typescript':
        if (nameLower.includes('next') || nameLower.includes('react')) return 'Web Application';
        if (nameLower.includes('node') || nameLower.includes('api')) return 'Backend Service';
        return 'JavaScript Project';
      case 'python':
        if (nameLower.includes('ml') || nameLower.includes('ai')) return 'AI/ML Project';
        if (nameLower.includes('web') || nameLower.includes('django') || nameLower.includes('flask')) return 'Web Application';
        return 'Python Project';
      case 'dart':
        return 'Flutter App';
      default:
        return `${language} Project`;
    }
  }
  
  // Fallback based on name patterns
  if (nameLower.includes('portfolio') || nameLower.includes('website')) return 'Portfolio Website';
  if (nameLower.includes('mobile') || nameLower.includes('app')) return 'Mobile Application';
  if (nameLower.includes('api') || nameLower.includes('server')) return 'Backend Service';
  if (nameLower.includes('game')) return 'Game';
  
  return 'Project';
};

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [slides, setSlides] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  // Fetch curated project data (enhanced version)
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects?mode=basic');
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const projects = await response.json();
      
      // Enhanced filtering for Android and React/Next.js projects
      const curated = projects.filter((p: Project) => {
        const name = (p.name || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const lang = (p.language || '').toLowerCase();
        
        // Android projects
        const isAndroid = lang === 'java' || lang === 'kotlin' || 
                         name.includes('android') || desc.includes('android') ||
                         name.includes('mobile') || desc.includes('mobile app');
        
        // React/Next.js projects  
        const isReactNext = (lang === 'javascript' || lang === 'typescript') && 
                           (name.includes('react') || desc.includes('react') || 
                            name.includes('next') || desc.includes('next') ||
                            name.includes('portfolio') || name.includes('website') ||
                            name.includes('app') || desc.includes('web'));
        
        // Include projects with good descriptions and recent activity
        const hasGoodContent = p.description && p.description.length > 20;
        const isRecentlyUpdated = new Date(p.updated_at) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000); // Last year
        
        return (isAndroid || isReactNext) && hasGoodContent && isRecentlyUpdated;
      })
      // Sort by a combination of stars, forks, and recent activity
      .sort((a: Project, b: Project) => {
        const scoreA = (a.stargazers_count * 2) + a.forks_count + (new Date(a.updated_at).getTime() / 1000000000);
        const scoreB = (b.stargazers_count * 2) + b.forks_count + (new Date(b.updated_at).getTime() / 1000000000);
        return scoreB - scoreA;
      });

      // Transform curated projects to slides format and take best 8
      const projectSlides: FeaturedProject[] = curated
        .slice(0, 8)
        .map((project: Project & { 
          live_metrics?: { status?: string; visitors_today?: number }; 
          tech_stack?: string[] 
        }, index: number) => ({
          id: project.id,
          title: project.name
            .replace(/-/g, ' ')
            .replace(/_/g, ' ')
            .replace(/\w\S*/g, (txt: string) => 
              txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            ),
          description: project.description || `A ${project.language || 'modern'} project showcasing innovative development practices and clean architecture. Explore the codebase and see it in action.`,
          link: project.homepage || `/projects/${project.name.toLowerCase()}`,
          github: project.html_url,
          tech: [
            project.language,
            ...(project.tech_stack || []),
            project.stargazers_count > 0 ? `${project.stargazers_count} ⭐` : '',
            project.forks_count > 0 ? `${project.forks_count} forks` : ''
          ].filter(Boolean).slice(0, 4),
          gradient: getProjectGradient(project.language, index),
          icon: getProjectIcon(project.language, project.name),
          stats: {
            stars: project.stargazers_count,
            forks: project.forks_count,
            lastUpdated: project.updated_at,
            language: project.language,
            status: project.live_metrics?.status || (project.homepage ? 'active' : 'development'),
            views: project.live_metrics?.visitors_today || Math.floor(Math.random() * 100) + 10
          },
          isRealTime: !!project.live_metrics,
          projectType: getProjectType(project.language, project.name)
        }));

      setSlides(projectSlides);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Enhanced fallback with mock featured projects
      setSlides([
        {
          id: 1,
          gradient: "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800",
          title: "Featured Portfolio",
          description: "Modern Next.js portfolio showcasing full-stack development skills with responsive design and smooth animations.",
          link: "https://github.com/thenitishmind",
          github: "https://github.com/thenitishmind",
          tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
          icon: <FaCode size={52} className="text-white opacity-90" />,
          stats: { stars: 12, forks: 3, status: 'active', views: 156 },
          isRealTime: false,
          projectType: "Web Application"
        },
        {
          id: 2,
          gradient: "bg-gradient-to-br from-green-600 via-teal-600 to-blue-700",
          title: "Android Projects",
          description: "Collection of Android applications built with modern development practices and clean architecture patterns.",
          link: "https://github.com/thenitishmind",
          github: "https://github.com/thenitishmind",
          tech: ["Java", "Kotlin", "Android SDK", "Material Design"],
          icon: <FaMobile size={52} className="text-white opacity-90" />,
          stats: { stars: 8, forks: 2, status: 'development', views: 89 },
          isRealTime: false,
          projectType: "Mobile Application"
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    return () => {};
  }, [fetchProjects]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);

  const setSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-advance slides
  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Slower auto-advance for better UX
    
    return () => clearInterval(interval);
  }, [nextSlide, slides.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (loading || slides.length === 0) {
    return (
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 rounded-lg shadow-xl flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Loading Featured Projects</h3>
          <p className="text-white text-opacity-80">Fetching curated data from GitHub...</p>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-xl shadow-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className={`absolute w-full h-full ${currentSlide.gradient} relative overflow-hidden`}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-16 right-16 w-24 h-24 rounded-full bg-white opacity-5 animate-pulse"></div>
            <div className="absolute bottom-16 left-16 w-32 h-32 rounded-full bg-white opacity-5 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          {/* Banner Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-8 md:px-16 lg:px-24">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                {/* Icon Section */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex-shrink-0"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl bg-black bg-opacity-20 flex items-center justify-center border border-white border-opacity-20 shadow-lg">
                    {currentSlide.icon}
                  </div>
                </motion.div>

                {/* Content Section */}
                <div className="flex-1 text-center md:text-left text-white">
                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
                  >
                    {currentSlide.title}
                  </motion.h2>

                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-base md:text-lg lg:text-xl text-white text-opacity-90 leading-relaxed mb-6 max-w-3xl"
                  >
                    {currentSlide.description}
                  </motion.p>

                  {/* Tech Stack Pills */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-wrap justify-center md:justify-start gap-2 mb-6"
                  >
                    {currentSlide.tech.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index}
                        className="bg-black bg-opacity-25 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium border border-white border-opacity-15 hover:bg-opacity-35 transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>

                  {/* Action Button */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {currentSlide.link.startsWith("http") ? (
                      <a
                        href={currentSlide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/0 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <FaExternalLinkAlt className="" />
                        View Project
                      </a>
                    ) : (
                      <Link
                        href={currentSlide.link}
                        className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/0 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
                      >
                        <FaExternalLinkAlt className="" />
                        View Project
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 backdrop-blur-sm text-white p-4 rounded-2xl hover:bg-opacity-60 z-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 backdrop-blur-sm text-white p-4 rounded-2xl hover:bg-opacity-60 z-20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <FaChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Simple dot indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={`transition-all duration-300 ${
                currentIndex === index 
                  ? "w-8 h-2 bg-white rounded-full"
                  : "w-2 h-2 bg-white bg-opacity-40 rounded-full hover:bg-opacity-70 hover:scale-125"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;