import { useParams, useNavigate } from 'react-router-dom';
import { useUserFollowers, useUserData } from '../../services/githubService';
import './FollowersPage.css';

const FollowersPage = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  
  if (!username) {
    return <div className="error">Username not found in URL</div>;
  }

  // Fetch the user data to display user info
  const {
    data: userData,
    isLoading: userLoading,
    error: userError
  } = useUserData(username);
  
  // Fetch the user's followers
  const {
    data: followerData,
    isLoading: followersLoading,
    error: followersError
  } = useUserFollowers(username);

  const followers = followerData?.friends || [];
  console.log("Followers data:", followers);

  const goToProfile = (followerUsername: string) => {
    navigate(`/user/${followerUsername}`);
  };

  const goBack = () => {
    navigate(`/user/${username}`);
  };

  if (userLoading || followersLoading) {
    return <div className="loading">Loading followers data...</div>;
  }

  if (userError || followersError) {
    return <div className="error">Error loading followers data. Please try again.</div>;
  }

  return (
    <div className="followers-container">
      <button className="back-button" onClick={goBack}>
        ← Back to Profile
      </button>

      <div className="followers-header">
        <h1>{userData?.name || username}'s Followers</h1>
        <p>Total Followers: {followers?.length || 0}</p>
      </div>

      <div className="followers-list">
        {followers && followers.length > 0 ? (
          followers.map((follower: any) => (
            <div key={follower.id || follower._id || follower.friend} className="follower-card" onClick={() => goToProfile(follower.friend || follower.login)}>
              <img 
                src={follower.avatar_url || `https://avatars.githubusercontent.com/${follower.friend || follower.login}`} 
                alt={`${follower.friend || follower.login}'s avatar`} 
                className="follower-avatar" 
              />
              <div className="follower-info">
                <h3>{follower.friend || follower.login}</h3>
                <a 
                  href={follower.html_url || `https://github.com/${follower.friend || follower.login}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on GitHub
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="no-followers">No followers found</div>
        )}
      </div>
    </div>
  );
};

export default FollowersPage;