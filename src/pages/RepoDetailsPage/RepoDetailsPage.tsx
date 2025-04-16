import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { Repository, setCurrentRepo } from '../../store/slices/repoSlice';
import RepoDetails from '../../components/RepoDeatail/RepoDetails'; 
import './RepoDetailsPage.css';

const RepoDetailsPage = () => {
  const { username, repoName } = useParams<{ username: string; repoName: string }>();
  const dispatch = useDispatch();
  
  const { currentRepo } = useSelector((state: RootState) => state.repos);
  
  console.log('Route Params:', { username, repoName });
  
  const {
    data: repoData,
    isLoading,
    error
  } = useQuery<Repository>({
    queryKey: ['repo', username, repoName],
    queryFn: async () => {
      if (!username || !repoName) throw new Error('Username or repository name is missing');
      
      console.log(`Fetching repo details for: ${username}/${repoName}`);
      
      try {
        const { data } = await api.get(`/repos/${username}/${repoName}`);
        console.log('Received repo data:', data);
        return data;
      } catch (err: any) {
        console.error('Error fetching repo details:', err);
        throw new Error(err.response?.data?.message || 'Failed to fetch repository details');
      }
    },
    enabled: !!username && !!repoName,
  });
  
  useEffect(() => {
    if (repoData) {
      dispatch(setCurrentRepo(repoData));
    }
  }, [repoData, dispatch]);

  return (
    <div className="repo-details-page">
      <RepoDetails
        repo={currentRepo ?? repoData}
        isLoading={isLoading}
        error={error ? (error as Error).message : null}
      />
    </div>
  );
};

export default RepoDetailsPage;