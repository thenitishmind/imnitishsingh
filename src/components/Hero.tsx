"use client";

import Link from "next/link";
import { FaGithub, FaArrowRight, FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";

interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

const Hero = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://api.github.com/users/thenitishmind');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching GitHub profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                👋 Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {profile?.name || "Nitish Singh"}
              </span>
            </h1>

            <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-xl">
              {profile?.bio || "A passionate developer building modern web applications and digital experiences that solve real-world problems."}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg"
              >
                <span className="flex items-center">
                  View Projects <FaArrowRight className="ml-2" />
                </span>
              </Link>
              <a
                href="/Resume/Nitish RESUME.pdf"
                download
                className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              >
                <FaDownload className="mr-2" /> Download Resume
              </a>
              <a
                href={profile?.html_url || "https://github.com/thenitishmind"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold"
              >
                <FaGithub className="mr-2" /> GitHub Profile
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="relative w-full h-[400px] bg-gradient-to-br from-orange-600/20 via-red-600/20 to-purple-600/20 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                <Image 
                  src="/images/profile-avatar.png"
                  alt="Nitish Singh Profile"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-600/90 via-red-600/90 to-purple-600/90 rounded-2xl border border-orange-500/50 flex items-center justify-center shadow-xl">
                <span className="text-5xl">🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
