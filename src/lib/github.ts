import { Octokit } from "octokit";
import { Project, GithubUser, GitHubLanguageStats } from "@/types";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
});

// GitHub username constant
const GITHUB_USERNAME = "thenitishmind";

// Extended Project interface with additional properties
interface ExtendedProject extends Project {
  imageUrl?: string;
  reviews?: Review[];
}

interface Review {
  author: string;
  text: string;
  rating: number;
}

// Function to check if an image exists
export async function imageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Get a list of fallback images
export const fallbackImages = [
  '/images/fallback/project-1.jpg',
  '/images/fallback/project-2.jpg',
  '/images/fallback/project-3.jpg',
  '/images/fallback/project-4.jpg',
  '/images/fallback/project-5.jpg',
];

// Get a random fallback image
export function getRandomFallbackImage(): string {
  const index = Math.floor(Math.random() * fallbackImages.length);
  return fallbackImages[index];
}

export async function getGithubUser(): Promise<GithubUser> {
  try {
    const response = await octokit.request('GET /users/{username}', {
      username: GITHUB_USERNAME,
    });
    
    return response.data as GithubUser;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    throw new Error('Failed to fetch GitHub user data');
  }
}

export async function getGithubProjects(): Promise<ExtendedProject[]> {
  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username: GITHUB_USERNAME,
      sort: 'updated',
      per_page: 100,
    });
    
    // Filter out forked repositories and transform the data
    const projects: ExtendedProject[] = response.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((repo: any) => !repo.fork)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((repo: any) => {
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage || null,
          language: repo.language || null,
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          created_at: repo.created_at || "",
          updated_at: repo.updated_at || "",
        };
      });
    
    // Add mock TableCraft project if it doesn't exist in the GitHub repos
    const hasTableCraft = projects.some(project => project.name.toLowerCase() === 'tablecraft');
    
    if (!hasTableCraft) {
      // Create a date 10 days ago for "recent" update
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 10);
      
      projects.push({
        id: 999999,
        name: "tableCraft",
        description: "An interactive table management system with drag-and-drop functionality, data filtering, and responsive design.",
        html_url: "https://github.com/thenitishmind/tableCraft",
        homepage: "",
        language: "JavaScript",
        stargazers_count: 12,
        forks_count: 3,
        created_at: "2023-05-15T12:00:00Z",
        updated_at: recentDate.toISOString(),
        imageUrl: "/images/projects/tableCraft.jpg",
        reviews: [
          {
            author: "Dev User",
            text: "Great table component with excellent features and performance!",
            rating: 5
          }
        ]
      });
    }
    
    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    throw new Error('Failed to fetch GitHub projects');
  }
}

// Mock data for project images and reviews since those aren't available from GitHub API
export const projectReviews = {
  // Add mock reviews for specific projects
  "portfolio-website": [
    {
      author: "Alex Thompson",
      text: "Great design and functionality!",
      rating: 5
    },
    {
      author: "Sarah Kim",
      text: "The portfolio is impressive and well-structured.",
      rating: 4
    }
  ],
  "e-commerce-app": [
    {
      author: "Michael Johnson",
      text: "Intuitive interface and seamless experience.",
      rating: 5
    }
  ],
  "tableCraft": [
    {
      author: "John Developer",
      text: "The TableCraft component is incredibly flexible and easy to integrate.",
      rating: 5
    },
    {
      author: "Maria Rodriguez",
      text: "Great performance even with large datasets. Highly recommended!",
      rating: 5
    },
    {
      author: "David Chen",
      text: "The sorting and filtering features are very well implemented.",
      rating: 4
    }
  ]
};

interface GitHubStatsReturn {
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

interface GitHubActivityReturn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentEvents: any[];
  recentCommits: CommitData[];
  lastUpdated: string;
}

// Real-time GitHub data functions
export async function getGithubStats(): Promise<GitHubStatsReturn> {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      octokit.request('GET /users/{username}', { username: GITHUB_USERNAME }),
      octokit.request('GET /users/{username}/repos', { 
        username: GITHUB_USERNAME, 
        per_page: 100,
        sort: 'updated'
      })
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repos = reposResponse.data.filter((repo: any) => !repo.fork);
    
    // Calculate total stars, forks, and languages
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const totalForks = repos.reduce((sum: number, repo: any) => sum + (repo.forks_count || 0), 0);
    
    const languages = repos
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((repo: any) => repo.language)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((acc: Record<string, number>, repo: any) => {
        if (repo.language) {
          acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

    const topLanguages = Object.entries(languages)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([lang, count]) => ({ language: lang, count: count as number }));

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user: userResponse.data as any,
      totalRepos: repos.length,
      totalStars,
      totalForks,
      topLanguages,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recentRepos: repos.slice(0, 6) as any[],
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw new Error('Failed to fetch GitHub statistics');
  }
}

export async function getGithubActivity(): Promise<GitHubActivityReturn> {
  try {
    const [eventsResponse, commitsResponse] = await Promise.all([
      octokit.request('GET /users/{username}/events/public', { 
        username: GITHUB_USERNAME,
        per_page: 30
      }),
      // Get commits from the most recent repositories
      getRecentCommits()
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const events = eventsResponse.data.slice(0, 10).map((event: any) => ({
      id: event.id,
      type: event.type,
      repo: { name: event.repo.name },
      created_at: event.created_at,
      payload: event.payload
    }));

    return {
      recentEvents: events,
      recentCommits: commitsResponse,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return {
      recentEvents: [],
      recentCommits: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

interface CommitData {
  sha: string;
  message: string;
  date: string;
  repo: string;
  url: string;
}

async function getRecentCommits(): Promise<CommitData[]> {
  try {
    const reposResponse = await octokit.request('GET /users/{username}/repos', {
      username: GITHUB_USERNAME,
      sort: 'updated',
      per_page: 5
    });

    const commitPromises = reposResponse.data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((repo: any) => !repo.fork)
      .slice(0, 3)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(async (repo: any) => {
        try {
          const commitsResponse = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: GITHUB_USERNAME,
            repo: repo.name,
            per_page: 5
          });
          
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return commitsResponse.data.map((commit: any) => ({
            sha: commit.sha,
            message: commit.commit.message,
            date: commit.commit.author.date,
            repo: repo.name,
            url: commit.html_url
          }));
        } catch {
          return [];
        }
      });

    const commitArrays = await Promise.all(commitPromises);
    return commitArrays.flat().slice(0, 10);
  } catch (error) {
    console.error('Error fetching recent commits:', error);
    return [];
  }
}

export async function getRepositoryDetails(repoName: string) {
  try {
    const [repoResponse, languagesResponse, contributorsResponse] = await Promise.all([
      octokit.request('GET /repos/{owner}/{repo}', {
        owner: GITHUB_USERNAME,
        repo: repoName
      }),
      octokit.request('GET /repos/{owner}/{repo}/languages', {
        owner: GITHUB_USERNAME,
        repo: repoName
      }),
      octokit.request('GET /repos/{owner}/{repo}/contributors', {
        owner: GITHUB_USERNAME,
        repo: repoName,
        per_page: 10
      }).catch(() => ({ data: [] })) // Handle private repos
    ]);

    const repo = repoResponse.data;
    const languages = languagesResponse.data;
    const contributors = contributorsResponse.data;

    // Calculate language percentages
    const totalBytes = Object.values(languages).reduce((sum: number, bytes) => sum + (bytes as number), 0);
    const languageStats: GitHubLanguageStats[] = Object.entries(languages).map(([lang, bytes]) => ({
      name: lang,
      percentage: Math.round(((bytes as number) / totalBytes) * 100),
      bytes: bytes as number
    })).sort((a, b) => b.percentage - a.percentage);

    return {
      ...repo,
      languageStats,
      contributors: contributors.slice(0, 5),
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching repository details for ${repoName}:`, error);
    throw new Error(`Failed to fetch repository details for ${repoName}`);
  }
}

// Enhanced project data with real-time GitHub information
export async function getEnhancedGithubProjects(): Promise<ExtendedProject[]> {
  try {
    const [projectsResponse] = await Promise.all([
      getGithubProjects()
    ]);

    // Enhance projects with additional real-time data
    const enhancedProjects = await Promise.all(
      projectsResponse.slice(0, 10).map(async (project) => {
        try {
          const repoDetails = await getRepositoryDetails(project.name);
          
          return {
            ...project,
            analytics: {
              views: Math.floor(Math.random() * 1000) + 100, // Mock data - GitHub doesn't provide view counts via API
              clicks: Math.floor(Math.random() * 500) + 50,
              stars_trend: project.stargazers_count,
              recent_commits: Math.floor(Math.random() * 20) + 1,
              contributors: repoDetails.contributors?.length || 1,
              issues: {
                open: repoDetails.open_issues_count || 0,
                closed: Math.floor(Math.random() * 10)
              },
              pull_requests: {
                open: Math.floor(Math.random() * 5),
                merged: Math.floor(Math.random() * 15)
              },
              deployments: {
                total: Math.floor(Math.random() * 50) + 10,
                successful: Math.floor(Math.random() * 45) + 8,
                failed: Math.floor(Math.random() * 5),
                last_deployed: project.updated_at
              }
            },
            tech_stack: repoDetails.languageStats?.map(lang => lang.name) || [project.language].filter(Boolean),
            features: generateProjectFeatures(project.name, project.description),
            demo_available: !!project.homepage,
            live_metrics: {
              uptime: Math.random() * 10 + 95, // 95-100% uptime
              response_time: Math.floor(Math.random() * 200) + 50, // 50-250ms
              last_deployment: project.updated_at,
              status: 'active' as const,
              visitors_today: Math.floor(Math.random() * 100) + 10,
              performance_score: Math.floor(Math.random() * 20) + 80 // 80-100 score
            }
          };
        } catch (error) {
          console.error(`Error enhancing project ${project.name}:`, error);
          return project; // Return original project if enhancement fails
        }
      })
    );

    return enhancedProjects;
  } catch (error) {
    console.error('Error fetching enhanced GitHub projects:', error);
    return getGithubProjects(); // Fallback to basic projects
  }
}

function generateProjectFeatures(name: string, description: string | null): string[] {
  const commonFeatures = ['Responsive Design', 'Modern UI/UX', 'Cross-browser Compatible'];
  
  if (name.toLowerCase().includes('react') || description?.toLowerCase().includes('react')) {
    return [...commonFeatures, 'React Components', 'State Management', 'Hooks'];
  }
  
  if (name.toLowerCase().includes('next') || description?.toLowerCase().includes('next')) {
    return [...commonFeatures, 'Server-side Rendering', 'API Routes', 'Optimized Performance'];
  }
  
  if (name.toLowerCase().includes('api') || description?.toLowerCase().includes('api')) {
    return [...commonFeatures, 'RESTful API', 'Database Integration', 'Authentication'];
  }
  
  return [...commonFeatures, 'Clean Code', 'Documentation', 'Version Control'];
}

// Mock testimonials data
export const testimonials = [
  {
    id: 1,
    name: "Saraswat Mukherjee",
    role: "Senior AI Engineer",
    company: "Microsoft.",
    text: "Working with Nitish was a great experience. His technical skills and attention to detail are impressive.",
    avatar: "/images/testimonials/Saraswat Mukherjee.jpg"
  },
  {
    id: 2,
    name: "Pankaj Kumar",
    role: "Cyber Security",
    company: "HCL",
    text: "Nitish is a dedicated developer who consistently delivers high-quality code and innovative solutions.",
    avatar: "/images/testimonials/Pankaj Kumar.jpg"
  },
  {
    id: 3,
    name: "Aditi Sharma",
    role: "College Student",
    company: "DPG College Haryana",
    text: "Collaborating with Nitish resulted in an exceptional product that exceeded client expectations.",
    avatar: "/images/testimonials/Krishna.jpg"
  }
];