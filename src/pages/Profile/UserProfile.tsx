import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserData, useUserRepositories } from '../../services/githubService';
import { RootState } from '../../store';
import { fetchUserSuccess, fetchUserFailure } from '../../store/slices/userSlice';
import { fetchReposSuccess, fetchReposFailure, setRepoPage } from '../../store/slices/repoSlice';
import './UserProfile.css';
import RepoShowcase from '../../components/RepoComponent/RepoShowcase';

const UserProfile = () => {
    const { username } = useParams<{ username: string }>();
    if (!username) {
        return <div className="error">Username not found in URL</div>;
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser, searchedUsers } = useSelector((state: RootState) => state.user);
    const userFromStore = searchedUsers[username ?? ''];

    const { repositories, pagination, loading: reposStoreLoading } = useSelector((state: RootState) => state.repos);
    
    // Get pagination for current user
    const userPagination = pagination[username] || { page: 1, perPage: 6, totalCount: 0 };
    
    const shouldFetchUser = !userFromStore;

    // Fetch user data using React Query
    const {
        data: userData,
        isLoading: userLoading,
        error: userError,
    } = useUserData(username!, { 
        enabled: shouldFetchUser, 
        queryKey: ['user', username] 
    });

    // Fetch repositories using React Query with pagination
    const {
        data: reposData,
        isLoading: reposLoading,
        error: reposError
    } = useUserRepositories(username, {
        page: userPagination.page,
        per_page: userPagination.perPage
    });

    // Update Redux store with data from React Query
    useEffect(() => {
        if (userData && shouldFetchUser) {
            dispatch(fetchUserSuccess(userData));
        }
        if (userError && shouldFetchUser) {
            dispatch(fetchUserFailure((userError as Error).message));
        }
    }, [userData, userError, shouldFetchUser, dispatch]);
      
    useEffect(() => {
        if (reposData && username) {
            dispatch(fetchReposSuccess({ 
                username, 
                repos: reposData,
                page: userPagination.page,
                perPage: userPagination.perPage,
                totalCount: currentUser?.public_repos || 0
            }));
        }
        if (reposError) {
            dispatch(fetchReposFailure((reposError as Error).message));
        }
    }, [reposData, reposError, username, dispatch, userPagination.page, userPagination.perPage, currentUser?.public_repos]);

    const handlePageChange = (page: number) => {
        dispatch(setRepoPage({ username, page }));
    };

    // const goToRepoDetails = (repoName: string) => {
    //     navigate(`/repos/${username}/${repoName}`);
    // };

    const goToFollowers = () => {
        navigate(`/followers/${username}`);
    };

    const goToHome = () => {
        navigate('/');
    };

    if (userLoading || reposLoading) {
        return <div className="loading">Loading user data...</div>;
    }

    if (userError || reposError) {
        return <div className="error">Error loading data. Please try again.</div>;
    }

    // Transform repositories to the format required by RepoShowcase
    const repoData = repositories[username]?.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url || `https://github.com/${username}/${repo.name}`,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        verified: false // You can set this based on your criteria
    })) || [];

    return (
        <div className="user-profile-container">
            <button className="back-button" onClick={goToHome}>
                ← Back to Search
            </button>

            {currentUser && (
                <div className="user-info">
                    <img
                        src={currentUser.avatar_url}
                        alt={`${currentUser.login}'s avatar`}
                        className="user-avatar"
                    />
                    <div className="user-details">
                        <h1>{currentUser.name || currentUser.login}</h1>
                        {currentUser.bio && <p className="user-bio">{currentUser.bio}</p>}
                        <div className="user-stats">
                            <span>Repositories: {currentUser.public_repos}</span>
                            <span>Followers: {currentUser.followers}</span>
                            <span>Following: {currentUser.following}</span>
                        </div>
                        <button
                            className="view-followers-button"
                            onClick={goToFollowers}
                        >
                            View Followers
                        </button>
                    </div>
                </div>
            )}

            <RepoShowcase 
                username={username}
                repositories={repoData}
                isLoading={reposLoading || reposStoreLoading}
                error={reposError ? (reposError as Error).message : null}
                totalRepos={currentUser?.public_repos || 0}
                currentPage={userPagination.page}
                onPageChange={handlePageChange}
                perPage={userPagination.perPage}
            />
        </div>
    );
};

export default UserProfile;
