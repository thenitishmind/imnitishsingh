export interface Project {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  imageUrl?: string;
  reviews?: Review[];
  tech_stack?: string[];
  features?: string[];
  demo_available?: boolean;
  analytics?: {
    views: number;
    clicks: number;
    stars_trend: number;
    recent_commits: number;
    contributors: number;
    issues: {
      open: number;
      closed: number;
    };
    pull_requests: {
      open: number;
      merged: number;
    };
    deployments: {
      total: number;
      successful: number;
      failed: number;
      last_deployed: string;
    };
  };
}

export interface Review {
  author: string;
  text: string;
  rating: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
} 

export type ProjectReviewKey = "portfolio-website" | "e-commerce-app" | "tableCraft";

// GitHub API response types
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null | undefined;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  fork: boolean;
  open_issues_count: number;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
    ref_type?: string;
  };
}

export interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  repo: string;
  url: string;
}

export interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
}

export interface GitHubLanguageStats {
  name: string;
  percentage: number;
  bytes: number;
}