import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import config from "../config";
import { toast } from "react-toastify";

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
const updateComment = async (commentData: {
  commentId: string;
  content: string;
}) => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(
    `${config.apiUrl}/comment/${commentData.commentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update comment");
  }

  return response.json();
};

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: updateComment,
  });
};

export const deleteComment = async (commentId: string) => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete the topic");
  }

  const data = await response.json();
  return data;
};
export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("Comment deleted");
    },
    onError: () => {
      toast.error("There was an error deleting the comment");
    },
  });
};

export const useCreateComment = () => {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      toast.success("Created a new comment");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
