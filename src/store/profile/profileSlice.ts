import { createSlice } from "@reduxjs/toolkit";

type Profile = {
  language: string;
};

const initialState: Profile = {
  language: "uk",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  selectors: {
    selectProfileLanguage: (sliceState: Profile) => sliceState.language,
  },
  reducers: {
    setProfileLanguage(state, action) {
      state.language = action.payload.language;
    },
  },
});

export const { setProfileLanguage } = profileSlice.actions;

export const { selectProfileLanguage } = profileSlice.selectors;

export default profileSlice.reducer;
