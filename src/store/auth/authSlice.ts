import { AuthState } from "@/src/constants/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: AuthState = {
  user: null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },

    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = counterSlice.actions;

export default counterSlice.reducer;
