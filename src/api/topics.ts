import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import config from "../config";

export const fetchTopics = async ({ pageParam = 0 }) => {
  const take = 21; //Added this to load 21 instead of 20 topics because there are three items per row so there wouldnt be an empty space between each fetch
  const token = localStorage.getItem("userToken");
  const response = await fetch(
    `${config.apiUrl}/topics?skip=${pageParam}&take=${take}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return {
    data,
    nextPage: data.length === take ? pageParam + take : null,
  };
};

export const useAllTopics = () => {
  return useInfiniteQuery({
    queryKey: ["allTopics"], // Query key for caching
    queryFn: fetchTopics, // Function to fetch data
    getNextPageParam: (lastPage) => lastPage.nextPage, // Determine the next page
    initialPageParam: 0, // Starting page index
  });
};

export const fetchLikedTopics = async ({ pageParam = 0 }) => {
  const take = 21; //Added this to load 21 instead of 20 topics because there are three items per row so there wouldnt be an empty space between each fetch
  const token = localStorage.getItem("userToken");
  const response = await fetch(
    `${config.apiUrl}/topics/like?skip=${pageParam}&take=${take}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return {
    data,
    nextPage: data.length === take ? pageParam + take : null,
  };
};

export const useAllLikedTopics = () => {
  return useInfiniteQuery({
    queryKey: ["hotTopics"],
    queryFn: fetchLikedTopics,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

export const getTopic = async (id: string) => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/topics/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export const useGetTopic = (id: string) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getTopic(id),
  });
};
