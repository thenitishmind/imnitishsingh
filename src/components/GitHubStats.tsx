"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch, FaCode, FaEye, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { getGithubStats, getGithubActivity } from "@/lib/github";

interface GitHubStatsData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: Array<{ language: string; count: number }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentRepos: any[];
  lastUpdated: string;
}

interface GitHubActivityData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentEvents: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentCommits: any[];
  lastUpdated: string;
}

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [activity, setActivity] = useState<GitHubActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const [statsData, activityData] = await Promise.all([
          getGithubStats(),
          getGithubActivity()
        ]);
        
        setStats(statsData);
        setActivity(activityData);
        setError(null);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();

    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchGitHubData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'PushEvent':
        return <FaCodeBranch className="text-green-400" />;
      case 'CreateEvent':
        return <FaCode className="text-blue-400" />;
      case 'WatchEvent':
        return <FaEye className="text-yellow-400" />;
      case 'ForkEvent':
        return <FaCodeBranch className="text-purple-400" />;
      default:
        return <FaGithub className="text-gray-400" />;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getEventDescription = (event: any) => {
    switch (event.type) {
      case 'PushEvent':
        const commitCount = event.payload?.commits?.length || 0;
        return `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to ${event.repo.name.replace('thenitishmind/', '')}`;
      case 'CreateEvent':
        return `Created ${event.payload?.ref_type || 'repository'} in ${event.repo.name.replace('thenitishmind/', '')}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name.replace('thenitishmind/', '')}`;
      case 'ForkEvent':
        return `Forked ${event.repo.name.replace('thenitishmind/', '')}`;
      default:
        return `${event.type} in ${event.repo.name.replace('thenitishmind/', '')}`;
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="h-40 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="text-center text-red-400">
          <FaGithub className="text-4xl mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaGithub className="text-2xl text-white mr-3" />
          <h3 className="text-xl font-bold text-white">GitHub Statistics</h3>
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <FaCalendarAlt className="mr-1" />
          <span>Updated {stats ? formatDate(stats.lastUpdated) : 'Never'}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-700/50 rounded-lg p-4 text-center"
        >
          <FaCode className="text-2xl text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats?.totalRepos || 0}</div>
          <div className="text-sm text-gray-400">Repositories</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-700/50 rounded-lg p-4 text-center"
        >
          <FaStar className="text-2xl text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats?.totalStars || 0}</div>
          <div className="text-sm text-gray-400">Total Stars</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-700/50 rounded-lg p-4 text-center"
        >
          <FaCodeBranch className="text-2xl text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats?.totalForks || 0}</div>
          <div className="text-sm text-gray-400">Total Forks</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-700/50 rounded-lg p-4 text-center"
        >
          <FaUsers className="text-2xl text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{stats?.user?.followers || 0}</div>
          <div className="text-sm text-gray-400">Followers</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Languages */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Top Languages</h4>
          <div className="space-y-3">
            {stats?.topLanguages?.slice(0, 5).map((lang, index) => (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-gray-300">{lang.language}</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-600 rounded-full h-2 mr-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(lang.count / (stats?.topLanguages?.[0]?.count || 1)) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-blue-500 h-2 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-gray-400">{lang.count}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {activity?.recentEvents?.slice(0, 8).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">
                    {getEventDescription(event)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(event.created_at)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Repositories */}
      {stats?.recentRepos && stats.recentRepos.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-white mb-4">Recent Repositories</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.recentRepos.slice(0, 6).map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700/70 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-white truncate">{repo.name}</h5>
                  <div className="flex items-center text-sm text-gray-400">
                    <FaStar className="mr-1" />
                    {repo.stargazers_count}
                  </div>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                  {repo.description || 'No description available'}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-blue-400">{repo.language || 'Unknown'}</span>
                  <span className="text-gray-500">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GitHubStats;
