// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import moviesList from "./slices/moviesListSlice.ts";

export const store = configureStore({
  reducer: {
    movies: moviesList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
