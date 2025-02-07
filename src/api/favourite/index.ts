import { useMutation, useQuery } from "@tanstack/react-query";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/lib/FirebaseConfig";
import { Favorites } from "@/src/constants/Types";
import { fetchMovieDetails } from "../movies";
import { fetchShowDetails } from "../tv-shows";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

export const useAddToFavorite = () => {
  return useMutation({
    async mutationFn(data: Favorites) {
      if (!auth.currentUser) {
        throw new Error("User is not authenticated");
      }

      await setDoc(doc(db, "Favorites", auth.currentUser.uid), data);
    },
  });
};

export const fetchFavorites = async (userId: string) => {
  const docRef = doc(FIREBASE_DB, "Favorites", userId);
  const favorites = await getDoc(docRef);

  if (!favorites.exists()) {
    throw new Error("Error while fetching favorites!");
  }

  return favorites.data();
};

const fetchFavoriteMovies = async (favoriteMoviesIds: string[], language: string) => {
  const movieCallbacks = favoriteMoviesIds.map((id) => fetchMovieDetails(id, language));

  const data = await Promise.all(movieCallbacks);

  return data;
};

const fetchFavoriteShows = async (favoriteShowIds: string[], language: string) => {
  const showCallbacks = favoriteShowIds.map((id) => fetchShowDetails(id, language));

  const data = await Promise.all(showCallbacks);

  return data;
};

export const useFavoriteMovies = (favoriteMoviesIds: string[], language: string) => {
  return useQuery({
    queryKey: ["favoriteMovies", favoriteMoviesIds],
    queryFn: async () => {
      const response = await fetchFavoriteMovies(favoriteMoviesIds, language);
      return response;
    },
    enabled: favoriteMoviesIds.length > 0,
  });
};

export const useFavoriteShows = (favoriteShowIds: string[], language: string) => {
  return useQuery({
    queryKey: ["favoriteShows", favoriteShowIds],
    queryFn: async () => {
      const response = await fetchFavoriteShows(favoriteShowIds, language);
      return response;
    },
    enabled: favoriteShowIds.length > 0,
  });
};
