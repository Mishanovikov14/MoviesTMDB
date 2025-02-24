import { TVShowPage } from "@/src/constants/Types";
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

export const fetchTVShowByType = async (
  type: string,
  language: string,
  pageParam = 1,
  id?: string
): Promise<TVShowPage> => {
  const response = await fetch(
    `${baseUrl}/tv/${id ? id + "/" + type : type}?language=${language}&page=${pageParam}&region=UA`,
    options
  );

  if (!response.ok) {
    throw new Error("Error while fetching TV Show!");
  }

  const data = await response.json();

  return data;
};

const fetchTVShows = async (language: string) => {
  const [popular, topRated, airingToday, onTheAir ] = await Promise.all([
    fetchTVShowByType("popular", language),
    fetchTVShowByType("top_rated", language),
    fetchTVShowByType("airing_today", language),
    fetchTVShowByType("on_the_air", language),
  ]);

  return { popular, topRated, airingToday, onTheAir };
};

export const useTVShows = (language: string) => {
  return useQuery({
    queryKey: ["tvShows", language],
    queryFn: () => fetchTVShows(language),
  });
};

export const useAllTVShows = (type: string, language: string, id?: string) => {
  const All_SHOW_TYPE: Record<string, { key: string; queryParam: string }> = {
    popular: {
      key: "popularshow",
      queryParam: "popular",
    },
    airingToday: {
      key: "airingtoday",
      queryParam: "airing_today",
    },
    onTheAir: {
      key: "ontheair",
      queryParam: "on_the_air",
    },
    topRated: {
      key: "topratedshow",
      queryParam: "top_rated",
    },
    similar: {
      key: "similarshow",
      queryParam: "similar",
    },
  };

  const queryParam = All_SHOW_TYPE[type]?.queryParam;

  if (!queryParam) {
    throw new Error(`Unknown type: ${type}`);
  }

  const key = All_SHOW_TYPE[type].key;

  return useInfiniteQuery<TVShowPage>({
    queryKey: [key, id, language],
    // @ts-ignore
    queryFn: ({ pageParam }: { pageParam: number }) => fetchTVShowByType(queryParam, language, pageParam, id),
    getNextPageParam: (lastPage: TVShowPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });
};

export const fetchShowDetails = async (id: string, language: string) => {
  const detailsUrl = `${baseUrl}/tv/${id}?append_to_response=credits,videos,similar&language=${language}`;
  const response = await fetch(detailsUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching TV Show details!");
  }

  const data = await response.json();

  return data;
};

export const useTVShowDetails = (id: string, language: string) => {
  return useQuery({
    queryKey: ["tvShowDetails", id, language],
    queryFn: () => fetchShowDetails(id, language),
  });
};

export const fetchSearchedTVShow = async (query: string, language: string) => {
  const detailsUrl = `${baseUrl}/search/tv?query=${query}&language=${language}`;
  const response = await fetch(detailsUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching searched TV Show!");
  }

  const data = await response.json();

  return data;
};

export const useSearchTVShows = (query: string, language: string) => {
  return useQuery({
    queryKey: ["searchedTVShow", query, language],
    queryFn: () => fetchSearchedTVShow(query, language),
  });
};
