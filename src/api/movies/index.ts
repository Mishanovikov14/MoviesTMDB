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

export const fetchMoviesByType = async (
  type: string,
  language = "en-US",
  pageParam = 1,
  id?: string
): Promise<MoviePage> => {
  const response = await fetch(
    `${baseUrl}/movie/${id ? id + "/" + type : type}?language=${language}&page=${pageParam}&region=UA`,
    options
  );

  if (!response.ok) {
    throw new Error("Error while fetching movies!");
  }

  const data = await response.json();

  return data;
};

const fetchMovies = async (language: string) => {
  const [popular, inTheater, upcoming, topRated] = await Promise.all([
    fetchMoviesByType("popular", language),
    fetchMoviesByType("now_playing", language),
    fetchMoviesByType("upcoming", language),
    fetchMoviesByType("top_rated", language),
  ]);

  return { popular, inTheater, upcoming, topRated };
};

export const useMovies = (language: string) => {
  return useQuery({
    queryKey: ["movies", language],
    queryFn: () => fetchMovies(language),
  });
};

export const useAllMovies = (type: string, language: string, id?: string) => {
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
    queryKey: [key, id, language],
    // @ts-ignore
    queryFn: ({ pageParam }: { pageParam: number }) => fetchMoviesByType(queryParam, language, pageParam, id),
    getNextPageParam: (lastPage: MoviePage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });
};

export const fetchMovieDetails = async (id: string, language: string) => {
  const detailsUrl = `${baseUrl}/movie/${id}?append_to_response=credits,videos,similar&language=${language}`;
  const response = await fetch(detailsUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching movie details!");
  }

  const data = await response.json();

  return data;
};

export const useMovieDetails = (id: string, language: string) => {
  return useQuery({
    queryKey: ["movieDetails", id, language],
    queryFn: () => fetchMovieDetails(id, language),
  });
};

export const fetchSearchedMovies = async (query: string, language: string) => {
  const detailsUrl = `${baseUrl}/search/movie?query=${query}&language=${language}`;
  const response = await fetch(detailsUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching searched movies!");
  }

  const data = await response.json();

  return data;
};

export const useSearchMovies = (query: string, language: string) => {
  return useQuery({
    queryKey: ["searchedMovies", query, language],
    queryFn: () => fetchSearchedMovies(query, language),
  });
};
