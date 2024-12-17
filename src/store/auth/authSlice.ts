import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// export interface CounterState {
//   value: number;
// }

interface AuthState {
  user: null | {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
}

// const initialState: CounterState = {
//   value: 0,
// };

const initialState: AuthState = {
  user: null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectUser: (sliceState: AuthState) => sliceState.user,
  },
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

export const { selectUser } = counterSlice.selectors;

export default counterSlice.reducer;
