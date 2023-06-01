import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getRepoIssues from "../api/getRepoIssues";
import getRepoStars from "../api/getRepoStars";
import { GitHubIssue } from '../types/types';
import moment from "moment";

interface AppState {
  issues: GitHubIssue[][],
  urlParts: string[],
  repoStars: number
}

interface SwapIssuesPayload {
  columnFromNumber: number,
  columnToNumber: number,
  columnFrom: GitHubIssue[],
  columnTo: GitHubIssue[],
}

const initialState: AppState = {
  issues: [],
  urlParts: [],
  repoStars: 0
}

export const getIssues = createAsyncThunk("repo/issues", async (url: string) => {
  const issues = await getRepoIssues(url);
  return {issues, url};
})

export const getStars = createAsyncThunk("repo/stars", async (url: string) => {
  const response = await getRepoStars(url);
  return response;
})

export const repoIssues = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    swapIssues: (state, action: PayloadAction<SwapIssuesPayload>) => {
      state.issues[action.payload.columnFromNumber] = action.payload.columnFrom
      state.issues[action.payload.columnToNumber] = action.payload.columnTo
    }
  },
  extraReducers: builder => {
    builder.addCase(getIssues.fulfilled, (state, action) => {
      state.issues[0] = action.payload.issues.filter(issue => moment(issue.created_at).isSame(moment(), "day"));
      state.issues[1] = action.payload.issues.filter(issue => issue.assignee != null || issue.assignees.length != 0);
      state.issues[2] = action.payload.issues.filter(issue => issue.state === "closed")
      state.urlParts = action.payload.url.split("/");
    }).addCase(getStars.fulfilled, (state, action) => {
      state.repoStars = action.payload.stargazers_count
    })
  },
})

export const {swapIssues} = repoIssues.actions;
export default repoIssues.reducer