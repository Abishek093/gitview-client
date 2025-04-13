import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RepoShowcase.css';

export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  verified?: boolean;
}

interface RepoShowcaseProps {
  username?: string;
  repositories: Repository[];
  isLoading?: boolean;
  error?: string | null;
  totalRepos?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  perPage?: number;
}

const RepoShowcase = ({
  username,
  repositories,
  isLoading,
  error,
  totalRepos = 0,
  currentPage = 1,
  onPageChange,
  perPage = 6
}: RepoShowcaseProps) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (repositories && repositories.length > 0) {
      setRepos(repositories);
    }
  }, [repositories]);

  const totalPages = Math.ceil(totalRepos / perPage);

  const handlePageChange = (page: number) => {
    if (onPageChange && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleRepoClick = (repoName: string) => {
    if (username) {
      navigate(`/repo/${username}/${repoName}`);
    }
  };

  if (isLoading) {
    return <div className="repo-loading">Loading repositories...</div>;
  }

  if (error) {
    return <div className="repo-error">Failed to load repositories: {error}</div>;
  }

  if (!repos.length) {
    return <div className="repo-empty">No repositories found</div>;
  }

  return (
    <div className="repo-showcase-container">
      <h2 className="repo-section-title">GitHub Repositories</h2>
      <div className="repo-grid">
        {repos.map((repo) => (
          <div key={repo.id} className="repo-card" onClick={() => handleRepoClick(repo.name)}>
            <div className="repo-header">
              <div className="repo-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="20" fill="#f0f0f0" />
                  <path d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20C30 14.48 25.52 10 20 10Z" fill="#4F9CF9" opacity="0.5" />
                  <path d="M20 26C23.3137 26 26 23.3137 26 20C26 16.6863 23.3137 14 20 14C16.6863 14 14 16.6863 14 20C14 23.3137 16.6863 26 20 26Z" fill="#4F9CF9" />
                </svg>
              </div>
              <div className="repo-title-container">
                <h3 className="repo-title">{repo.name}</h3>
                {repo.verified && (
                  <span className="verified-badge">✓</span>
                )}
              </div>
            </div>
            <p className="repo-description">
              {repo.description || "No description available"}
            </p>
            <div className="repo-stats">
              {repo.language && (
                <span className="repo-language">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></span>
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="repo-stars">★ {repo.stargazers_count}</span>
              )}
              {repo.forks_count > 0 && (
                <span className="repo-forks">⑂ {repo.forks_count}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      { }
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || isLoading}
            className="pagination-button"
          >
            Previous
          </button>

          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || isLoading}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    Ruby: '#701516',
    Go: '#00ADD8',
    PHP: '#4F5D95',

  };

  return colors[language] || '#858585';
};

export default RepoShowcase;