import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface UserState {
  currentUser: GitHubUser | null;
  searchedUsers: Record<string, GitHubUser>; 
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  searchedUsers: {},
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<GitHubUser>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.searchedUsers[action.payload.login] = action.payload;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    updateUserSuccess: (state, action: PayloadAction<GitHubUser>) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.searchedUsers[action.payload.login] = action.payload;
    },
  },
});

export const { 
  fetchUserStart, 
  fetchUserSuccess, 
  fetchUserFailure,
  clearCurrentUser,
  updateUserSuccess
} = userSlice.actions;

export default userSlice.reducer;