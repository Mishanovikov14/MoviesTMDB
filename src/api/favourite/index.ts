import { useMutation, useQuery } from "@tanstack/react-query";
import { setDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/lib/FirebaseConfig";
import { Favorites } from "@/src/constants/Types";
import { fetchMovieDetails } from "../movies";
import { fetchShowDetails } from "../tv-Shows";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

export const useAddToFavorite = () => {
  return useMutation({
    async mutationFn(data: Favorites) {
      if (!auth.currentUser) {
        throw new Error("User is not authenticated");
      }

      await setDoc(doc(db, "Favorites", auth.currentUser.uid), data);
    }
  });
};

const fetchFavoriteMovies = async (favoriteMoviesIds: string[]) => {
  const movieCallbacks = favoriteMoviesIds.map((id) => fetchMovieDetails(id));

  const data = await Promise.all(movieCallbacks);

  return data;
};

const fetchFavoriteShows = async (favoriteShowIds: string[]) => {
  const showCallbacks = favoriteShowIds.map((id) => fetchShowDetails(id));

  const data = await Promise.all(showCallbacks);

  return data;
};

export const useFavoriteMovies = (favoriteMoviesIds: string[]) => {
  return useQuery({
    queryKey: ["favoritemovies", favoriteMoviesIds],
    queryFn: async () => {
      const response = await fetchFavoriteMovies(favoriteMoviesIds);
      return response;
    },
    enabled: favoriteMoviesIds.length > 0,
  });
};

export const useFavoriteShows = (favoriteShowIds: string[]) => {
  return useQuery({
    queryKey: ["favoriteshows", favoriteShowIds],
    queryFn: async () => {
      const response = await fetchFavoriteShows(favoriteShowIds);
      return response;
    },
    enabled: favoriteShowIds.length > 0,
  });
};

