import { useQuery, UseQueryOptions} from '@tanstack/react-query';
import { api } from './api';
import { GitHubUser } from '../store/slices/userSlice';
import { Repository } from '../store/slices/repoSlice';

export interface PaginationParams {
  page: number;
  per_page: number;
}

export const useUserData = (
  username: string,
  options?: UseQueryOptions<GitHubUser>
) => {
  return useQuery<GitHubUser>({
    queryKey: ['user', username],
    queryFn: async () => {
      const { data } = await api.get(`/users/${username}`);
      return data;
    },
    enabled: !!username,
    ...options,
  });
};

export const useUserRepositories = (username: string, pagination: PaginationParams = { page: 1, per_page: 6 }) => {
  return useQuery<Repository[]>({
    queryKey: ['repos', username, pagination.page, pagination.per_page],
    queryFn: async () => {
      const { data } = await api.get(`/repos/${username}`, {
        params: {
          page: pagination.page,
          per_page: pagination.per_page
        }
      });
      return data;
    },
    enabled: !!username,
    placeholderData: (previousData) => previousData,
  });
};

export const useUserFollowers = (username: string) => {
  return useQuery({
    queryKey: ['followers', username],
    queryFn: async () => {
      const { data } = await api.get(`/users/${username}/followers`);
      return data;
    },
    enabled: !!username, 
  });
};

export const useFindMutualFriends = (username: string) => {
  return useQuery({
    queryKey: ['friends', username],
    queryFn: async () => {
      const { data } = await api.get(`/friends/${username}`);
      return data.friends;
    },
    enabled: !!username,
  });
};