import { MoviePage } from "@/src/constants/Types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const apiToken = process.env.EXPO_PUBLIC_TMDB_API_TOKEN;
const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `${apiToken}`,
  },
};

//Ukrainian language = uk
export const fetchMoviesByType = async (
  type: string,
  pageParam = 1,
  id?: string
): Promise<MoviePage> => {
  const response = await fetch(
    `${baseUrl}/movie/${id ? id + "/" + type : type}?language=en-US&page=${pageParam}&region=UA`,
    options
  );

  if (!response.ok) {
    throw new Error("Error while fetching movies!");
  }

  const data = await response.json();

  return data;
};

const fetchMovies = async () => {
  const [popular, inTheater, upcoming, topRated] = await Promise.all([
    fetchMoviesByType("popular"),
    fetchMoviesByType("now_playing"),
    fetchMoviesByType("upcoming"),
    fetchMoviesByType("top_rated"),
  ]);

  return { popular, inTheater, upcoming, topRated };
};

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
};

export const useAllMovies = (type: string, id?: string) => {
  const All_MOVIES_TYPE: Record<string, { key: string; queryParam: string }> = {
    popular: {
      key: "popularmovie",
      queryParam: "popular",
    },
    inTheater: {
      key: "intheatermovie",
      queryParam: "now_playing",
    },
    topRated: {
      key: "topratedmovie",
      queryParam: "upcoming",
    },
    upcoming: {
      key: "upcommingmovie",
      queryParam: "top_rated",
    },
    similar: {
      key: "similarmovie",
      queryParam: "similar",
    },
  };

  const queryParam = All_MOVIES_TYPE[type]?.queryParam;

  if (!queryParam) {
    throw new Error(`Unknown type: ${type}`);
  }

  const key = All_MOVIES_TYPE[type].key;

  return useInfiniteQuery<MoviePage>({
    queryKey: [key, id],
    // @ts-ignore
    queryFn: ({ pageParam }: { pageParam: number }) => fetchMoviesByType(queryParam, pageParam, id),
    getNextPageParam: (lastPage: MoviePage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });
};

export const fetchMovieDetails = async (id: string) => {
  const detailsUrl = `${baseUrl}/movie/${id}?append_to_response=credits,videos,similar&language=en-US`;
  const response = await fetch(detailsUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching movie details!");
  }

  const data = await response.json();

  return data;
};

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => fetchMovieDetails(id),
  });
};
