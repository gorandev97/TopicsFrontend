import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import config from "../config";
import { toast } from "react-toastify";

export const fetchTopics = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: (string | { search: string; category: string })[];
}) => {
  const [, params] = queryKey;
  const { search, category } = params as { search: string; category: string };
  const take = 21; //Added this to load 21 instead of 20 topics because there are three items per row so there wouldnt be an empty space between each fetch
  const token = localStorage.getItem("userToken");
  const response = await fetch(
    `${config.apiUrl}/topics?skip=${pageParam}&take=${take}&search=${search}&category=${category}`,
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

export const useAllTopics = (search: string, category: string) => {
  return useInfiniteQuery({
    queryKey: ["allTopics", { search, category }],
    queryFn: fetchTopics,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

export const fetchLikedTopics = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: (string | { search: string; category: string })[];
}) => {
  const [, params] = queryKey;
  const { search, category } = params as { search: string; category: string };
  const take = 21; //Added this to load 21 instead of 20 topics because there are three items per row so there wouldnt be an empty space between each fetch
  const token = localStorage.getItem("userToken");
  const response = await fetch(
    `${config.apiUrl}/topics/like?skip=${pageParam}&take=${take}&search=${search}&category=${category}`,
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

export const useAllLikedTopics = (search: string, category: string) => {
  return useInfiniteQuery({
    queryKey: ["hotTopics", { search, category }],
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

const updateTopic = async (topicCredentials: {
  topicId: string;
  title: string;
  content: string;
  category: string;
}) => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(
    `${config.apiUrl}/topics/${topicCredentials.topicId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicCredentials),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update topic");
  }

  return response.json();
};

export const useUpdateTopic = () => {
  return useMutation({
    mutationFn: updateTopic,
  });
};

export const deleteTopic = async (topicId: string) => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/topics/${topicId}`, {
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
export const useDeleteTopic = () => {
  return useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      toast.success("Topic deleted");
    },
    onError: () => {
      toast.error("There was an error deleting the topic");
    },
  });
};

export const fetchUserTopics = async ({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: (string | { search: string; category: string })[];
}) => {
  const [, params] = queryKey;
  const { search, category } = params as { search: string; category: string };
  const take = 21; //Added this to load 21 instead of 20 topics because there are three items per row so there wouldnt be an empty space between each fetch
  const token = localStorage.getItem("userToken");
  const response = await fetch(
    `${config.apiUrl}/topics/user?skip=${pageParam}&take=${take}&search=${search}&category=${category}`,
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

export const useUserTopics = (search: string, category: string) => {
  return useInfiniteQuery({
    queryKey: ["allUserTopics", { search, category }],
    queryFn: fetchUserTopics,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
};

export const createTopic = async (createTopicDto: {
  description: string;
  title: string;
  category: string;
}) => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/topics`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createTopicDto),
  });
  return response.json();
};

export const useCreateTopic = () => {
  return useMutation({
    mutationFn: createTopic,
    onSuccess: () => {
      toast.success("Created a new topic!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
};
