import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import config from "../config";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

export { queryClient };
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
    queryKey: ["topic", id],
    queryFn: () => getTopic(id),
  });
};

const updateTopic = async (topicCredentials: {
  topicId: string;
  title: string;
  content: string;
  category: string;
  file?: File | null;
}) => {
  const token = localStorage.getItem("userToken");
  const formData = new FormData();

  formData.append("content", topicCredentials.content);
  formData.append("title", topicCredentials.title);
  formData.append("category", topicCredentials.category);

  if (topicCredentials.file) {
    formData.append("file", topicCredentials.file);
  }
  const response = await fetch(
    `${config.apiUrl}/topics/${topicCredentials.topicId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update topic");
  }

  if (!response.ok) {
    throw new Error("Failed to create topic");
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
  file?: File | null;
}) => {
  const token = localStorage.getItem("userToken");

  const formData = new FormData();

  // Append the form data
  formData.append("description", createTopicDto.description);
  formData.append("title", createTopicDto.title);
  formData.append("category", createTopicDto.category);

  // If a file is provided, append it as well
  if (createTopicDto.file) {
    formData.append("file", createTopicDto.file); // File must be a File object
  }

  const response = await fetch(`${config.apiUrl}/topics`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // Send formData instead of JSON
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
