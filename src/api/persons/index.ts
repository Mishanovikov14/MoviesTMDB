import { useQuery } from "@tanstack/react-query";

const apiToken = process.env.EXPO_PUBLIC_TMDB_API_TOKEN;
const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `${apiToken}`,
  },
};

const fetchPersonDetails = async (id: string) => {
  const detailsUrl = `${baseUrl}/person/${id}?append_to_response=movie_credits,tv_credits&language=en-US`;
  const response = await fetch(detailsUrl, options);

  if (!response.ok) {
    throw new Error("Error while fetching person details!");
  }

  const data = await response.json();

  return data;
};

export const usePersonDetails = (id: string) => {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => fetchPersonDetails(id),
  });
};
