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
  pageParam = 1,
  id?: string
): Promise<TVShowPage> => {
  const response = await fetch(
    `${baseUrl}/tv/${id ? id + "/" + type : type}?language=en-US&page=${pageParam}&region=UA`,
    options
  );

  if (!response.ok) {
    throw new Error("Error while fetching TV Show!");
  }

  const data = await response.json();

  return data;
};

const fetchTVShows = async () => {
  const [popular, topRated, airingToday, onTheAir ] = await Promise.all([
    fetchTVShowByType("popular"),
    fetchTVShowByType("top_rated"),
    fetchTVShowByType("airing_today"),
    fetchTVShowByType("on_the_air"),
  ]);

  return { popular, topRated, airingToday, onTheAir };
};

export const useTVShows = () => {
  return useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTVShows,
  });
};

export const useAllTVShows = (type: string, id?: string) => {
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
    queryKey: [key, id],
    // @ts-ignore
    queryFn: ({ pageParam }: { pageParam: number }) => fetchTVShowByType(queryParam, pageParam, id),
    getNextPageParam: (lastPage: TVShowPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
  });
};

export const fetchShowDetails = async (id: string) => {
  const detailsUrl = `${baseUrl}/tv/${id}?append_to_response=credits,videos,similar&language=en-US`;
  const response = await fetch(detailsUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching TV Show details!");
  }

  const data = await response.json();

  return data;
};

export const useTVShowDetails = (id: string) => {
  return useQuery({
    queryKey: ["tvshow", id],
    queryFn: () => fetchShowDetails(id),
  });
};
