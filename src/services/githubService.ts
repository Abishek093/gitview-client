import { useQuery, UseQueryOptions } from '@tanstack/react-query';
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

export const useRepositoryDetails = (username: string, repoName: string) => {
  return useQuery<Repository>({
    queryKey: ['repos-details', username, repoName],
    queryFn: async () => {
      const { data } = await api.get(`/repos/${username}/${repoName}`);
      return data;
    },
    enabled: !!username && !!repoName,
  });
};

export const useUserFollowers = (username: string) => {
  return useQuery({
    queryKey: ['followers', username],
    queryFn: async () => {
      const { data } = await api.get(`/friends/${username}/followers`);
      return data; // Return the entire response which contains {count, friends}
    },
    enabled: !!username,
  });
};

export const useMutualFriends = (username: string) => {
  return useQuery({
    queryKey: ['mutual-friends', username],
    queryFn: async () => {
      const { data } = await api.get(`/friends/${username}`);
      return data; // Return the entire response which contains {count, friends}
    },
    enabled: !!username,
  });
};