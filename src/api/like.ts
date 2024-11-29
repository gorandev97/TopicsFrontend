import config from "../config";

export const toggleLikeDislikeAPI = async (likeCredentials: {
  userId: string;
  targetId: string;
  isTopic: boolean;
  isLike: boolean;
}) => {
  const token = localStorage.getItem("userToken");
  console.log(likeCredentials, "KREDENCIJALI");
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
  console.log(response.json());
  if (!response.ok) {
    throw new Error("Error toggling like/dislike");
  }

  return response;
};
