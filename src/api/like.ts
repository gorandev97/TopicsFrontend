import config from "../config";
import { Like } from "../interfaces/interfaces";

export const toggleLikeDislikeAPI = async (likeCredentials: {
  userId: string;
  targetId: string;
  isTopic: boolean;
  isLike: boolean;
}): Promise<Like> => {
  const token = localStorage.getItem("userToken");
  const response = await fetch(`${config.apiUrl}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      likeCredentials,
    }),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("Error toggling like/dislike");
  }

  return responseData;
};
