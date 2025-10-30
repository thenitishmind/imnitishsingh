"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import ProjectCard from "@/components/ProjectCard";
import { getGithubProjects } from "@/lib/github";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("latest");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getGithubProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      if (!filter) return true;
      
      return (
        project.name.toLowerCase().includes(filter.toLowerCase()) ||
        (project.description?.toLowerCase().includes(filter.toLowerCase()) ?? false) ||
        (project.language?.toLowerCase().includes(filter.toLowerCase()) ?? false)
      );
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
      } else if (sortBy === "stars") {
        return b.stargazers_count - a.stargazers_count;
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-900 tech-grid-bg py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center surface-glass holographic-border rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-cyan-400 font-medium text-sm neon-text">Portfolio Showcase</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 neon-text">
            My Projects
          </h1>
          
          <div className="w-32 h-2 modern-gradient mx-auto mb-8 rounded-full shadow-lg animate-gradient-shift" />
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Browse through all my GitHub projects. Filter and sort to find what interests you.
          </p>
        </div>

        <div className="mb-12 flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search projects..."
              className="w-full surface-glass text-white border border-cyan-500/30 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 placeholder:text-slate-400"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-56">
            <select
              className="w-full surface-glass text-white border border-purple-500/30 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest" className="bg-slate-800">Latest Updated</option>
              <option value="oldest" className="bg-slate-800">Oldest Updated</option>
              <option value="stars" className="bg-slate-800">Most Stars</option>
              <option value="name" className="bg-slate-800">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500/30 border-t-cyan-400"></div>
              <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-cyan-400/20"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center surface-glass rounded-xl p-8 border border-red-500/30">
            <p className="text-red-400 text-lg font-medium">{error}</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center surface-glass rounded-xl p-12 border border-slate-600/30">
            <p className="text-xl text-slate-300 mb-6">No projects found matching your criteria.</p>
            <button
              className="px-8 py-4 modern-gradient text-white rounded-xl font-semibold hover:shadow-cyan-500/50 transition-all duration-300 shadow-lg neon-text"
              onClick={() => {
                setFilter("");
                setSortBy("latest");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
