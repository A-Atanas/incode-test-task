import { configureStore } from '@reduxjs/toolkit';
import repoReducer from "./issues";

const store = configureStore({
  reducer: {
    repo: repoReducer
  },
})

export type Store = ReturnType<typeof store.getState>
export type Dispatcher = typeof store.dispatch

export default store;