import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export type MovieCard = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type ListItem = {
  data: MovieCard;
};

export type AuthState = {
  user: null | {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
};

export type ButtonProps = {
  onPress: () => void;
  children: ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
};
