import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getRepoIssues from "../api/getRepoIssues";
import getRepoStars from "../api/getRepoStars";
import { GitHubIssue } from '../types/types';

interface AppState {
  issues: GitHubIssue[],
  urlParts: string[],
  repoStars: number
}

const initialState: AppState = {
  issues: [],
  urlParts: [],
  repoStars: 0
}

export const getIssues = createAsyncThunk("repo/issues", async (url: string) => {
  const response = await getRepoIssues(url);
  return {issues: response, url};
})

export const getStars = createAsyncThunk("repo/stars", async (url: string) => {
  const response = await getRepoStars(url);
  return response;
})

export const repoIssues = createSlice({
  name: 'repo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getIssues.fulfilled, (state, action) => {
      state.issues = action.payload.issues;
      state.urlParts = action.payload.url.split("/");
    }).addCase(getStars.fulfilled, (state, action) => {
      state.repoStars = action.payload.stargazers_count
    })
  },
})

export default repoIssues.reducer