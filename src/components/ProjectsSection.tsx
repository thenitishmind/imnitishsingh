"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaArrowRight, FaClock, FaStar, FaRocket, FaCode, FaGlobe } from "react-icons/fa";
import { Project } from "@/types";
import ProjectCard from "@/components/ProjectCard";
import { getGithubProjects } from "@/lib/github";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const featuredCarouselRef = useRef<HTMLDivElement | null>(null);

  const fetchLiveProjectData = async () => {
    try {
      const response = await fetch('/api/projects?mode=basic', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const basicData = await response.json();
        return basicData;
      } else {
        console.warn('Basic API failed, falling back to GitHub data');
        return await getGithubProjects();
      }
    } catch (error) {
      console.warn('Basic API error, falling back to GitHub data:', error);
      return await getGithubProjects();
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchLiveProjectData();
        
        const matchesFilter = (p: Project) => {
          const name = (p.name || '').toLowerCase();
          const desc = (p.description || '').toLowerCase();
          const lang = (p.language || '').toLowerCase();
          const isAndroid = lang === 'java' || lang === 'kotlin' || name.includes('android') || desc.includes('android');
          const isReactNext = (lang === 'javascript' || lang === 'typescript') && (name.includes('react') || desc.includes('react') || name.includes('next') || desc.includes('next'));
          return isAndroid || isReactNext;
        };

        const filtered = data.filter((p: Project) => matchesFilter(p));

        const sortedByRecent = [...filtered].sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        
        setRecentProjects(sortedByRecent.slice(0, 3));
        
        const sortedByStars = [...filtered].sort((a, b) => b.stargazers_count - a.stargazers_count);
        const recentIds = sortedByRecent.slice(0, 3).map(p => p.id);
        const featuredProjects = sortedByStars
          .filter(p => !recentIds.includes(p.id))
          .slice(0, 6);
        
        setProjects(featuredProjects);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'web') return project.language === 'JavaScript' || project.language === 'TypeScript';
    if (activeFilter === 'mobile') return project.language === 'Java' || project.language === 'Swift';
    if (activeFilter === 'backend') return project.language === 'Python' || project.language === 'Node.js';
    return true;
  });

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-500/20">
            <FaRocket className="mr-2" />
            Live Projects
          </div>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
            My Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover my latest work featuring modern web applications, innovative solutions, and cutting-edge technologies.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { key: 'all', label: 'All Projects', icon: FaCode },
            { key: 'web', label: 'Web Apps', icon: FaGlobe },
            { key: 'mobile', label: 'Mobile', icon: FaRocket },
            { key: 'backend', label: 'Backend', icon: FaStar }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex items-center px-6 py-3 rounded-full font-medium ${
                activeFilter === key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-gray-800/50 text-gray-300 border border-gray-600/30'
              }`}
            >
              <Icon className="mr-2 text-sm" />
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-red-400 text-4xl mb-4">⚠️</div>
              <p className="text-red-300 text-lg">{error}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Recent Projects Section */}
            <div className="mb-20">
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-3 rounded-full border border-blue-500/30">
                  <FaClock className="text-blue-400 mr-3 text-lg" />
                  <h3 className="text-2xl font-bold text-white">Latest Work</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} isRecent={true} />
                ))}
              </div>
            </div>
            
            {/* Featured Projects Section */}
            <div>
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 px-6 py-3 rounded-full border border-purple-500/30">
                  <FaStar className="text-purple-400 mr-3 text-lg" />
                  <h3 className="text-2xl font-bold text-white">Featured Projects</h3>
                </div>
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => {
                    const c = featuredCarouselRef.current;
                    if (!c) return;
                    c.scrollBy({ left: -c.clientWidth * 0.9, behavior: 'smooth' });
                  }}
                  className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => {
                    const c = featuredCarouselRef.current;
                    if (!c) return;
                    c.scrollBy({ left: c.clientWidth * 0.9, behavior: 'smooth' });
                  }}
                  className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white"
                >
                  ›
                </button>
                <div ref={featuredCarouselRef} className="overflow-x-auto no-scrollbar snap-x snap-mandatory">
                  <div className="flex gap-6 pr-6">
                    {filteredProjects.map((project) => (
                      <div key={project.id} className="snap-start min-w-[85%] sm:min-w-[55%] md:min-w-[40%] lg:min-w-[25%] xl:min-w-[20%]">
                        <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-bold text-white truncate pr-2">{project.name}</h4>
                              {project.language && (
                                <span className="ml-2 shrink-0 px-2 py-0.5 text-[10px] rounded-full bg-white/10 text-gray-200 border border-white/10">{project.language}</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-300 line-clamp-2 mb-4">{project.description || 'A modern project with clean UX and robust engineering.'}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                              <span className="inline-flex items-center gap-1"><FaStar className="text-yellow-300" /> {project.stargazers_count}</span>
                              <span>{new Date(project.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex gap-2">
                              {project.homepage && (
                                <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 text-sm font-semibold">Live</a>
                              )}
                              <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg text-gray-200 bg-white/5 border border-white/10 text-sm font-semibold">Code</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg"
              >
                <span>Explore All Projects</span>
                <FaArrowRight className="ml-3" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
