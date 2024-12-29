import { useMutation, useQuery } from "@tanstack/react-query";
import { setDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/lib/FirebaseConfig";
import { Favorites } from "@/src/constants/Types";
import { fetchMovieDetails } from "../movies";

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

const fetchFavoriteMovies = async (favoriteIds: string[], favoriteShowIds: string[]) => {
  const movieCallbacks = favoriteIds.map((id) => fetchMovieDetails(id));
  const showCallbacks = favoriteShowIds.map((id) => fetchMovieDetails(id)); //TODO: change on TV show

  const data = await Promise.all([...movieCallbacks, ...showCallbacks]);

  return data;
};

export const useFavoriteMovies = (favoriteIds: string[], favoriteShowIds: string[]) => {
  return useQuery({
    queryKey: ["favoriteMovies", favoriteIds],
    queryFn: async () => {
      const response = await fetchFavoriteMovies(favoriteIds, favoriteShowIds);
      return response;
    },
    refetchOnMount: true,
    enabled: favoriteIds.length > 0,
  });
};
