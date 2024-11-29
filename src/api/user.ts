import config from "../config";

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
