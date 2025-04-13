// import { useNavigate, useParams } from 'react-router-dom';
// import { Repository } from '../../store/slices/repoSlice';
// import './RepoDetails.css';

// interface RepoDetailsProps {
//   repo?: Repository;
//   isLoading?: boolean;
//   error?: string | null;
// }

// const RepoDetails = ({ repo, isLoading, error }: RepoDetailsProps) => {
//   const navigate = useNavigate();
//   const { username, repoName } = useParams<{ username: string; repoName: string }>();

//   const goBack = () => {
//     navigate(`/user/${username}`);
//   };

//   if (isLoading) {
//     return (
//       <div className="repo-details-container">
//         <button className="back-button" onClick={goBack}>
//           ← Back to User Profile
//         </button>
//         <div className="repo-details-loading">
//           Loading repository details for {username}/{repoName}...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="repo-details-container">
//         <button className="back-button" onClick={goBack}>
//           ← Back to User Profile
//         </button>
//         <div className="repo-details-error">
//           <div>Error: {error}</div>
//           <div className="debug-info">
//             <p>Debug Info:</p>
//             <p>Username: {username}</p>
//             <p>Repository: {repoName}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!repo) {
//     return (
//       <div className="repo-details-container">
//         <button className="back-button" onClick={goBack}>
//           ← Back to User Profile
//         </button>
//         <div className="repo-details-empty">
//           Repository not found: {username}/{repoName}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="repo-details-container">
//       <button className="back-button" onClick={goBack}>
//         ← Back to User Profile
//       </button>

//       <div className="repo-card">
//         <div className="repo-header">
//           <div className="repo-icon">
//             <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="40" cy="40" r="40" fill="#1e1e1e" />
//               <path d="M40 25L52 32V47L40 55L28 47V32L40 25Z" fill="#4299e1" stroke="#4299e1" strokeWidth="1" />
//             </svg>
//           </div>

//           <div className="repo-title-container">
//             <div className="application-label">Application</div>
//             <h1 className="repo-title">gitpod.io</h1>
            
//             <button
//               className="setup-plan-button"
//               onClick={() => window.open(repo.html_url, '_blank')}
//             >
//               Set up a plan
//             </button>

//             <div className="verification-badge">
//               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill="#2CBE4E" fillOpacity="0.1" stroke="#2CBE4E" strokeWidth="1.5" />
//                 <path d="M5 8L7 10L11 6" stroke="#2CBE4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               <span>Verified by GitHub</span>
//             </div>
//             <div className="verification-text">
//               GitHub confirms that this app meets the <a href="#" className="requirements-link">requirements for verification</a>.
//             </div>

//             <div className="categories">
//               <div className="category-title">Categories</div>
//               <div className="category-tags">
//               {repo.language && (
//                 <span className="repo-language">
//                   <span
//                     className="language-dot"
//                     style={{ backgroundColor: getLanguageColor(repo.language) }}
//                   ></span>
//                   {repo.language}
//                 </span>
//               )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="repo-description">

//           <p>{repo.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const getLanguageColor = (language: string): string => {
//   const colors: Record<string, string> = {
//     JavaScript: '#f1e05a',
//     TypeScript: '#2b7489',
//     HTML: '#e34c26',
//     CSS: '#563d7c',
//     Python: '#3572A5',
//     Java: '#b07219',
//     Ruby: '#701516',
//     Go: '#00ADD8',
//     PHP: '#4F5D95',

//   };

//   return colors[language] || '#858585';
// };

// export default RepoDetails;


import { useNavigate, useParams } from 'react-router-dom';
import { Repository } from '../../store/slices/repoSlice';
import './RepoDetails.css';

interface RepoDetailsProps {
  repo?: Repository;
  isLoading?: boolean;
  error?: string | null;
}

const RepoDetails = ({ repo, isLoading, error }: RepoDetailsProps) => {
  const navigate = useNavigate();
  const { username, repoName } = useParams<{ username: string; repoName: string }>();

  const goBack = () => {
    navigate(`/user/${username}`);
  };

  if (isLoading) {
    return (
      <div className="repo-details-view">
        <button className="back-button" onClick={goBack}>
          ← Back to User Profile
        </button>
        <div className="repo-details-loading">
          Loading repository details for {username}/{repoName}...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="repo-details-view">
        <button className="back-button" onClick={goBack}>
          ← Back to User Profile
        </button>
        <div className="repo-details-error">
          <div>Error: {error}</div>
          <div className="debug-info">
            <p>Debug Info:</p>
            <p>Username: {username}</p>
            <p>Repository: {repoName}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!repo) {
    return (
      <div className="repo-details-view">
        <button className="back-button" onClick={goBack}>
          ← Back to User Profile
        </button>
        <div className="repo-details-empty">
          Repository not found: {username}/{repoName}
        </div>
      </div>
    );
  }

  return (
    <div className="repo-details-view">
      <button className="back-button" onClick={goBack}>
        ← Back to User Profile
      </button>

      <div className="repo-detail-card">
        <div className="repo-detail-header">
          <div className="repo-detail-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#1e1e1e" />
              <path d="M40 25L52 32V47L40 55L28 47V32L40 25Z" fill="#4299e1" stroke="#4299e1" strokeWidth="1" />
            </svg>
          </div>

          <div className="repo-detail-title-container">
            <div className="application-label">Application</div>
            <h1 className="repo-detail-title">{repo.name}</h1>
            
            <button
              className="setup-plan-button"
              onClick={() => window.open(repo.html_url, '_blank')}
            >
              Set up a plan
            </button>

            <div className="verification-badge">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" fill="#2CBE4E" fillOpacity="0.1" stroke="#2CBE4E" strokeWidth="1.5" />
                <path d="M5 8L7 10L11 6" stroke="#2CBE4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Verified by GitHub</span>
            </div>
            <div className="verification-text">
              GitHub confirms that this app meets the <a href="#" className="requirements-link">requirements for verification</a>.
            </div>

            <div className="categories">
              <div className="category-title">Categories</div>
              <div className="category-tags">
              {repo.language && (
                <span className="repo-language">
                  <span
                    className="language-dot"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></span>
                  {repo.language}
                </span>
              )}
              </div>
            </div>
          </div>
        </div>

        <div className="repo-detail-description">
          <p>{repo.description || "No description available"}</p>
        </div>
      </div>
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

export default RepoDetails;