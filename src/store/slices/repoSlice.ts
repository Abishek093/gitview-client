import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface PaginationState {
  page: number;
  perPage: number;
  totalCount: number;
}

interface RepoState {
  repositories: Record<string, Repository[]>; 
  pagination: Record<string, PaginationState>;
  currentRepo: Repository | null;
  loading: boolean;
  error: string | null;
}

const initialState: RepoState = {
  repositories: {},
  pagination: {},
  currentRepo: null,
  loading: false,
  error: null,
};

export const repoSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    fetchReposStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReposSuccess: (state, action: PayloadAction<{ 
      username: string; 
      repos: Repository[]; 
      page?: number;
      perPage?: number;
      totalCount?: number;
    }>) => {
      state.loading = false;
      state.repositories[action.payload.username] = action.payload.repos;
      
      // Update pagination info
      if (action.payload.page !== undefined) {
        state.pagination[action.payload.username] = {
          page: action.payload.page,
          perPage: action.payload.perPage || 6,
          totalCount: action.payload.totalCount || 0
        };
      }
    },
    fetchReposFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentRepo: (state, action: PayloadAction<Repository>) => {
      state.currentRepo = action.payload;
    },
    clearCurrentRepo: (state) => {
      state.currentRepo = null;
    },
    setRepoPage: (state, action: PayloadAction<{ username: string; page: number; }>) => {
      const { username, page } = action.payload;
      if (state.pagination[username]) {
        state.pagination[username].page = page;
      } else {
        state.pagination[username] = {
          page,
          perPage: 6,
          totalCount: 0
        };
      }
    }
  },
});

export const {
  fetchReposStart,
  fetchReposSuccess,
  fetchReposFailure,
  setCurrentRepo,
  clearCurrentRepo,
  setRepoPage
} = repoSlice.actions;

export default repoSlice.reducer;