import { Favorites } from "@/src/constants/Types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Favorites = {
  movieIds: [],
  tvShowIds: [],
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  selectors: {
    selectFavoriteMovies: (sliceState: Favorites) => sliceState?.movieIds,
    selectFavoriteTVShows: (sliceState: Favorites) => sliceState?.tvShowIds,
  },
  reducers: {
    setFavorites(state, action) {
      state.movieIds = action.payload.movieIds || [];
      state.tvShowIds = action.payload.tvShowIds || [];
    },

    clearFavorites(state) {
      state.movieIds = [];
      state.tvShowIds = [];
    },
  },
});

export const { setFavorites, clearFavorites } = favoriteSlice.actions;

export const { selectFavoriteMovies, selectFavoriteTVShows } = favoriteSlice.selectors;

export default favoriteSlice.reducer;
