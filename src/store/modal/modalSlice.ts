import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  title: "",
  message: "",
  borderColor: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.isVisible = true;
      state.title = action.payload.title || "";
      state.message = action.payload.message || "";
      state.borderColor = action.payload.borderColor || "";
    },

    hideModal: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
