import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import creditsReducer from "./credits/creditsSlice";
import favoriteReducer from "./favorites/favoriteSlice";
import modalReducer from "./modal/modalSlice";
import profileReducer from "./profile/profileSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    credits: creditsReducer,
    favorites: favoriteReducer,
    modal: modalReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
