import { CreditsState } from "@/src/constants/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: CreditsState = {
  credits: null,
};

export const creditsSlice = createSlice({
  name: "credits",
  initialState,
  selectors: {
    selectCast: (sliceState: CreditsState) => sliceState.credits?.cast ?? [],
    selectCrew: (sliceState: CreditsState) => sliceState.credits?.crew ?? [],
  },
  reducers: {
    setCredits(state, action: PayloadAction<CreditsState["credits"]>) {
      state.credits = action.payload;
    },

    clearCredits(state) {
      state.credits = null;
    },
  },
});

export const { setCredits, clearCredits } = creditsSlice.actions;

export const { selectCast, selectCrew } = creditsSlice.selectors;

export default creditsSlice.reducer;
