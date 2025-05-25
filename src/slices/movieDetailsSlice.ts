import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Movie } from "../movieTypes";

interface MovieDetailsState {
  data: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchMovieDetails = createAsyncThunk<Movie, string>(
  "movie/fetcDetails",
  async (url) => {
    const res = await fetch(url);
    return res.json();
  }
);

const movieDetailsSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.data = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch movie details";
      });
  },
});

export default movieDetailsSlice.reducer;
