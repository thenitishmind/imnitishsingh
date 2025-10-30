"use client";

import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaClock, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  isRecent?: boolean;
}

const ProjectCard = ({ project, index, isRecent = false }: ProjectCardProps) => {
  const [showCode, setShowCode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isRecentlyUpdated = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(project.updated_at) > thirtyDaysAgo;
  };

  const getLanguageColor = (language: string | null) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'from-yellow-400 to-yellow-600',
      TypeScript: 'from-blue-400 to-blue-600',
      Python: 'from-blue-500 to-yellow-500',
      Java: 'from-red-500 to-orange-500',
      'C++': 'from-pink-500 to-purple-600',
      Ruby: 'from-red-600 to-red-800',
      Go: 'from-cyan-400 to-blue-500',
      Rust: 'from-orange-600 to-red-600',
      PHP: 'from-indigo-400 to-purple-600',
      Swift: 'from-orange-500 to-red-500',
      Kotlin: 'from-purple-500 to-indigo-600',
      HTML: 'from-orange-400 to-red-500',
      CSS: 'from-blue-400 to-indigo-500',
    };
    return colors[language || ''] || 'from-gray-500 to-gray-700';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const codeSnippet = `// ${project.name}
const project = {
  name: "${project.name}",
  language: "${project.language || 'JavaScript'}",
  stars: ${project.stargazers_count},
  forks: ${project.forks_count},
  status: "active"
};

export default project;`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-gray-800/80 via-gray-800/70 to-gray-900/80 rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 h-full flex flex-col"
    >
      {/* Gradient Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${isHovered ? '50% 50%' : '0% 0%'}, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.05), transparent 70%)`,
        }}
      />

      {/* Accent Bar */}
      <motion.div
        className={`h-1 bg-gradient-to-r ${getLanguageColor(project.language)}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      />

      <div className="relative p-8 flex-grow flex flex-col">
        {/* Recent Badge */}
        {(isRecent || isRecentlyUpdated()) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
            className="absolute top-6 right-6 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg z-10"
          >
            NEW
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {project.name}
          </h3>

          {/* Language & Stats */}
          <div className="flex flex-wrap items-center gap-3">
            {project.language && (
              <span className={`px-3 py-1 bg-gradient-to-r ${getLanguageColor(project.language)} text-white text-xs font-semibold rounded-lg shadow-md`}>
                {project.language}
              </span>
            )}
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center text-yellow-400 font-medium">
                <FaStar className="mr-1" /> {project.stargazers_count}
              </span>
              <span className="flex items-center text-cyan-400 font-medium">
                <FaCodeBranch className="mr-1" /> {project.forks_count}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {project.description || "An innovative project showcasing modern development practices."}
        </p>

        {/* Last Updated */}
        <div className="text-xs text-gray-500 mb-6 flex items-center">
          <FaClock className="mr-2" />
          Updated: {formatDate(project.updated_at)}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <motion.a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white rounded-xl font-medium transition-all duration-300 border border-gray-600/50"
            >
              <FaGithub className="text-lg" />
              <span>Code</span>
            </motion.a>

            {project.homepage && (
              <motion.a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg"
              >
                <FaExternalLinkAlt />
                <span>Demo</span>
              </motion.a>
            )}
          </div>

          {/* Code Preview Toggle */}
          <motion.button
            onClick={() => setShowCode(!showCode)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-xl transition-all duration-300 flex items-center justify-center font-medium border border-gray-700/50 hover:border-gray-600/50"
          >
            <FaEye className="mr-2" />
            {showCode ? "Hide Code" : "View Code"}
          </motion.button>
        </div>

        {/* Code Preview */}
        <motion.div
          initial={false}
          animate={{ height: showCode ? "auto" : 0, opacity: showCode ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {showCode && (
            <div className="mt-4 bg-gray-900/90 p-4 rounded-xl border border-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-400 font-mono">code-preview.js</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </motion.div>
      </div>

      {/* Hover Border Glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20"></div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
