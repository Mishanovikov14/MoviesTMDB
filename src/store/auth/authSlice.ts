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
  token: string | null;
}

// const initialState: CounterState = {
//   value: 0,
// };

const initialState: AuthState = {
  user: null,
  token: null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectSessionToken: (sliceState: AuthState) => sliceState.token,
  },
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    clearUser(state) {
      state.user = null;
      state.token = null; // Очищаем токен
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

export const { setUser, setToken, clearUser } = counterSlice.actions;

export const { selectSessionToken } = counterSlice.selectors;

export default counterSlice.reducer;
