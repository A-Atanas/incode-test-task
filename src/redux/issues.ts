import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import getRepoIssues from "../api/getRepoIssues";
import getRepoStars from "../api/getRepoStars";
import { GitHubIssue } from '../types/types';
import moment from "moment";

interface AppState {
  issues: GitHubIssue[][],
  urlParts: string[],
  repoStars: number,
  wasSearchLinkInvalid: boolean
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
  repoStars: 0,
  wasSearchLinkInvalid: false
}

export const getIssues = createAsyncThunk("repo/issues", async (url: string) => {
  let issuesInLocalStorage = localStorage.getItem(url);
  if (issuesInLocalStorage != null) return {issues: JSON.parse(issuesInLocalStorage), url, isFromStorage: true};
  const issues = await getRepoIssues(url);
  return {issues, url, isFromStorage: false};
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
      localStorage.setItem(state.urlParts.join("/"), JSON.stringify(state.issues))
    }
  },
  extraReducers: builder => {
    builder.addCase(getIssues.fulfilled, (state, action) => {
      state.wasSearchLinkInvalid = false;
      if (!action.payload.isFromStorage) {
        state.issues[0] = action.payload.issues.filter((issue: GitHubIssue) => moment(issue.created_at).isSame(moment(), "day"));
        state.issues[1] = action.payload.issues.filter((issue: GitHubIssue) => issue.assignee != null);
        state.issues[2] = action.payload.issues.filter((issue: GitHubIssue) => issue.state === "closed")
      } else {
        state.issues = action.payload.issues;
      }
      state.urlParts = action.payload.url.split("/");
    }).addCase(getStars.fulfilled, (state, action) => {
      state.repoStars = action.payload.stargazers_count
    }).addCase(getIssues.rejected, (state) => {
      state.wasSearchLinkInvalid = true;
    })
  },
})

export const {swapIssues} = repoIssues.actions;
export default repoIssues.reducer