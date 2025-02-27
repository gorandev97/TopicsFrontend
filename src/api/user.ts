import { useMutation, useQuery } from "@tanstack/react-query";
import config from "../config";
import { toast } from "react-toastify";

export const fetchUsers = async ({ pageParam = 0 }) => {
  const take = 50;
  const token = localStorage.getItem("userToken");
  const response = await fetch(
    `${config.apiUrl}/users/comments?skip=${pageParam}&take=${take}`,
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

export const getMe = async () => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/users`, {
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

export const useGetMe = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getMe(),
  });
};

const updateUser = async (commentData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  token?: string | null;
}) => {
  let existingToken = commentData.token;
  if (!existingToken) existingToken = localStorage.getItem("userToken") ?? "";

  const response = await fetch(`${config.apiUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${existingToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error("Failed to update comment");
  }

  return response.json();
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const deleteUser = async () => {
  const token = localStorage.getItem("userToken");

  const response = await fetch(`${config.apiUrl}/users/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete the user");
  }

  const data = await response.json();
  return data;
};
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted");
      localStorage.removeItem("userToken");
    },
    onError: () => {
      toast.error("There was an error deleting the user");
    },
  });
};
