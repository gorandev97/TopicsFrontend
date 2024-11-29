import { useInfiniteQuery } from "@tanstack/react-query";
import config from "../config";

export const fetchLikedComments = async ({
  pageParam = 0,
  topicId,
}: {
  pageParam?: number;
  topicId: string;
}) => {
  const take = 5;
  const token = localStorage.getItem("userToken");

  const response = await fetch(
    `${config.apiUrl}/comment/like?topicId=${topicId}&skip=${pageParam}&take=${take}`,
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
    nextPage: data.length === take ? pageParam + take : null, // Handle pagination: if there are more items, return next page
  };
};

export const useLikedComments = (topicId: string) => {
  return useInfiniteQuery({
    queryKey: ["likedComments", topicId],
    queryFn: ({ pageParam = 0 }) => fetchLikedComments({ pageParam, topicId }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

export const createComment = async (createCommentDto: {
  content: string;
  topicId: string;
}) => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/comment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createCommentDto),
  });

  return response.json();
};
