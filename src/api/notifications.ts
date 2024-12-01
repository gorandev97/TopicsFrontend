import { useMutation, useQuery } from "@tanstack/react-query";
import config from "../config";
import { toast } from "react-toastify";

export const getNotifications = async () => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/notifications`, {
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

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });
};

const updateNotifications = async () => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/notifications`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update comment");
  }

  return response.json();
};

export const useUpdateNotifications = () => {
  return useMutation({
    mutationFn: updateNotifications,
    onSuccess: () => {
      toast.success("JEEJ");
    },
  });
};
