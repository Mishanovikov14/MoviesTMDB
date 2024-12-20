import { useQuery } from "@tanstack/react-query";

const apiToken = process.env.EXPO_PUBLIC_TMDB_API_TOKEN;
const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

//Ukrainian language = uk
const popularUrl = `${baseUrl}/movie/popular?language=en-US&page=1&region=UA`;
const upcomingUrl = `${baseUrl}/movie/upcoming?language=en-US&page=1&region=UA`;
const nowPlayUrl = `${baseUrl}/movie/now_playing?language=en-US&page=1&region=UA`;
const topRatedUrl = `${baseUrl}/movie/top_rated?language=en-US&page=1&region=UA`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `${apiToken}`,
  },
};

const fetchPopular = async () => {
  const response = await fetch(popularUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching popular movies!");
  }

  const data = await response.json();

  return data;
};

const fetchInTheater = async () => {
  const response = await fetch(nowPlayUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching movies in theater!");
  }

  const data = await response.json();

  return data;
};

const fetchUpcomming = async () => {
  const response = await fetch(upcomingUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching upcoming movies!");
  }

  const data = await response.json();

  return data;
};

const fetchTopRated = async () => {
  const response = await fetch(topRatedUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching top rated movies!");
  }

  const data = await response.json();

  return data;
};

const fetchMovieDetails = async (id: string) => {
  const detailsUrl = `${baseUrl}/movie/${id}?append_to_response=credits,videos,similar&language=en-US`;
  const response = await fetch(detailsUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching top rated movies!");
  }

  const data = await response.json();

  return data;
};

const fetchMovies = async () => {
  const [popular, inTheater, upcoming, topRated] = await Promise.all([
    fetchPopular(),
    fetchInTheater(),
    fetchUpcomming(),
    fetchTopRated(),
  ]);

  return { popular, inTheater, upcoming, topRated };
};

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
};

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: ["movies", id],
    queryFn: () => fetchMovieDetails(id),
  });
};
