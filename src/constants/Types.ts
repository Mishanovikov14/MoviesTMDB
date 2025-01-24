import { Ionicons } from "@expo/vector-icons";
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

export type TVShowCard = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type PersonCard = {
  adult: boolean;
  profile_path: string;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  gender: number;
  character?: string;
  job?: string;
  credit_id: string;
  popularity: number;
  cast_id: number;
  order: number;
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
};

export type ListItem = {
  data: MovieCard | TVShowCard;
  dynamicPath: string;
  type?: string;
};

export type PersonListItem = {
  data: PersonCard;
  dynamicPath: string;
  type: string;
};

export type AuthState = {
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
};

export type CreditsState = {
  credits: null | {
    cast: PersonCard[];
    crew: PersonCard[];
  };
};

export type ButtonProps = {
  onPress: () => void;
  children?: ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
  iconColor?: string;
};

export type MoviePage = {
  page: number;
  pages: MovieCard[][];
  results: MovieCard[];
  total_pages: number;
  total_results: number;
};

export type TVShowPage = {
  page: number;
  pages: TVShowCard[][];
  results: TVShowCard[];
  total_pages: number;
  total_results: number;
};

export type Favorites = {
  movieIds: string[];
  tvShowIds: string[];
} | null;

export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};
