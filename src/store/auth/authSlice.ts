import { AuthState } from "@/src/constants/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// export interface CounterState {
//   value: number;
// }

// const initialState: CounterState = {
//   value: 0,
// };

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

    // increment: (state) => {
    //   state.value += 1;
    // },

    // decrement: (state) => {
    //   state.value -= 1;
    // },

    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { setUser, clearUser } = counterSlice.actions;

export default counterSlice.reducer;
